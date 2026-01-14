const Course = require("./course.model");
const Module = require("./module.model");
const User = require("../users/user.model");

exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, category, thumbnail, slug, level, duration, price } = req.body;

    // Create course
    const course = await Course.create({
      title,
      description,
      category,
      thumbnail,
      slug,
      level,
      duration,
      price,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { title, description, category, thumbnail, published, slug, level, duration, price } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.category = category || course.category;
    course.thumbnail = thumbnail || course.thumbnail;
    course.slug = slug || course.slug;
    course.level = level || course.level;
    course.duration = duration || course.duration;
    course.price = price || course.price;
    if (published !== undefined) course.published = published;

    await course.save();
    res.json(course);
  } catch (err) {
    next(err);
  }
};

exports.getAllCourses = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, level } = req.query;

    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category && category !== "All") {
      query.category = category;
    }

    if (level && level !== "All") {
      query.level = level;
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .select("-students");

    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name")
      .populate("students", "name");

    if (!course) return res.status(404).json({ message: "Course not found" });

    const modules = await Module.find({ course: req.params.id }).sort("order");

    const result = course.toObject();
    result.modules = modules;

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.enrollCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    // Check user role
    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can enroll" });
    }

    // 1. Check if already enrolled in THIS course
    const user = await User.findById(userId).populate("enrolledCourses.course");

    const existingEnrollment = user.enrolledCourses.find(
      (e) => e.course && e.course._id.toString() === courseId,
    );

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // 2. Check strict constraint: "Student can purchase 1 course at a time"
    const activeCourse = user.enrolledCourses.find(
      (e) => e.completedAt === null && e.course !== null,
    );

    if (activeCourse) {
      return res.status(400).json({
        message:
          "You have an active course. Complete it before enrolling in a new one.",
      });
    }

    // Proceed to enroll
    // Update User
    user.enrolledCourses.push({
      course: courseId,
      enrolledAt: new Date(),
      completedModules: [],
    });
    try {
      await user.save();
    } catch (saveErr) {
      console.error("User Save Failed during Enrollment:", saveErr);
      return res
        .status(500)
        .json({ message: "Enrollment failed: " + saveErr.message });
    }

    // Update Course
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { students: userId },
      $inc: { enrolledCount: 1 },
    });

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    next(err);
  }
};

exports.markModuleCompleted = async (req, res, next) => {
  try {
    const { id: courseId, moduleId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      (e) => e.course.toString() === courseId,
    );

    if (!enrollment) {
      return res.status(403).json({ message: "Not enrolled in this course" });
    }

    // Check if already completed
    if (enrollment.completedModules.includes(moduleId)) {
      return res.json({ message: "Module already completed" });
    }

    // Validate sequence
    const modules = await Module.find({ course: courseId }).sort("order");
    const currentModuleIndex = modules.findIndex(
      (m) => m._id.toString() === moduleId,
    );

    if (currentModuleIndex === -1) {
      return res.status(404).json({ message: "Module not found" });
    }

    if (currentModuleIndex > 0) {
      const prevModuleId = modules[currentModuleIndex - 1]._id.toString();
      if (!enrollment.completedModules.includes(prevModuleId)) {
        return res
          .status(400)
          .json({ message: "Previous module not completed" });
      }
    }

    // Mark as completed
    enrollment.completedModules.push(moduleId);

    // Update progress
    enrollment.progress = Math.round(
      (enrollment.completedModules.length / modules.length) * 100,
    );

    // Check if course completed
    if (enrollment.completedModules.length === modules.length) {
      enrollment.completedAt = new Date();
      user.points += 100; // Bonus points
    }

    // Add points per module
    user.points += 10;

    await user.save();

    res.json({
      message: "Module completed",
      progress: enrollment.progress,
      completedAt: enrollment.completedAt,
    });
  } catch (err) {
    next(err);
  }
};

exports.submitMCQ = async (req, res, next) => {
  try {
    const { id: courseId, moduleId } = req.params;
    const { answers, cheated, subModuleId, cheatingDetails } = req.body;
    const userId = req.user.id;

    // 1. Fetch Module to get correct answers
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const subModule = module.subModules.id(subModuleId);
    if (!subModule || subModule.type !== "mcq") {
      return res.status(400).json({ message: "Invalid MCQ module" });
    }

    // 2. Score the quiz
    let score = 0;
    let totalPoints = 0;

    subModule.questions.forEach((q) => {
      totalPoints += q.points;
      const userAnswer = answers[q._id];
      if (userAnswer === q.correctAnswer) {
        score += q.points;
      }
    });

    // 3. Cheating Penalty
    const passed = score >= totalPoints * 0.7 && !cheated; // 70% passing + No Cheating

    if (cheated) {
      console.log(`User ${userId} cheated in module ${moduleId}`);
      if (cheatingDetails && Array.isArray(cheatingDetails)) {
        console.log("Cheating Details:", JSON.stringify(cheatingDetails, null, 2));
      }
    }

    res.json({
      score,
      totalPoints,
      passed,
      cheated,
      message: cheated
        ? "Cheating detected! Quiz failed."
        : passed
          ? "Quiz Passed!"
          : "Quiz Failed. Try again.",
    });
  } catch (err) {
    next(err);
  }
};

exports.addModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, order } = req.body;

    const module = await Module.create({
      course: id,
      title,
      order: order || 0,
      subModules: [],
    });

    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

exports.addLesson = async (req, res, next) => {
  try {
    const { id, moduleId } = req.params;
    const { title, type, content, duration, url, questions } = req.body;

    // video, text, mcq
    const newLesson = {
      title,
      type, // 'video', 'text', 'mcq'
      content, // for text
      videoUrl: url, // for video
      duration: duration || 0,
      questions: questions || [], // for mcq
    };

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.subModules.push(newLesson);
    await module.save();

    res.status(201).json(module);
  } catch (err) {
    next(err);
  }
};

exports.updateModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    const { title } = req.body;
    const module = await Module.findByIdAndUpdate(
      moduleId,
      { title },
      { new: true },
    );
    res.json(module);
  } catch (err) {
    next(err);
  }
};

exports.deleteModule = async (req, res, next) => {
  try {
    const { moduleId } = req.params;
    await Module.findByIdAndDelete(moduleId);
    res.json({ message: "Module deleted" });
  } catch (err) {
    next(err);
  }
};

exports.reorderModules = async (req, res, next) => {
  try {
    const { modules } = req.body;

    const updates = modules.map(({ id, order }) => ({
      updateOne: {
        filter: { _id: id },
        update: { order },
      },
    }));

    if (updates.length > 0) {
      await Module.bulkWrite(updates);
    }
    res.json({ message: "Modules reordered" });
  } catch (err) {
    next(err);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const { moduleId, lessonId } = req.params;
    const { title, type, content, url, duration, questions } = req.body;

    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    const lesson = module.subModules.id(lessonId);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    if (title) lesson.title = title;
    if (type) lesson.type = type;
    if (content !== undefined) lesson.content = content;
    if (url !== undefined) lesson.videoUrl = url;
    if (duration !== undefined) lesson.duration = duration;
    if (questions) lesson.questions = questions;

    await module.save();
    res.json(module);
  } catch (err) {
    next(err);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    const { moduleId, lessonId } = req.params;
    const module = await Module.findById(moduleId);
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.subModules.pull(lessonId);
    await module.save();
    res.json(module);
  } catch (err) {
    next(err);
  }
};
exports.submitProject = async (req, res, next) => {
  try {
    const { id: courseId, moduleId } = req.params;
    const { repoUrl } = req.body;
    const userId = req.user.id;

    if (!repoUrl || !repoUrl.includes("github.com")) {
      return res.status(400).json({ message: "Invalid GitHub URL" });
    }

    console.log(
      `User ${userId} submitted project for module ${moduleId}: ${repoUrl}`,
    );

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      (e) => e.course.toString() === courseId,
    );

    if (!enrollment) return res.status(403).json({ message: "Not enrolled" });

    if (!enrollment.completedModules.includes(moduleId)) {
      enrollment.completedModules.push(moduleId);

      const modules = await Module.find({ course: courseId }).sort("order");
      enrollment.progress = Math.round(
        (enrollment.completedModules.length / modules.length) * 100,
      );

      if (enrollment.completedModules.length === modules.length) {
        enrollment.completedAt = new Date();
        user.points += 200; // Big bonus for project?
      } else {
        user.points += 50; // Project points
      }
      await user.save();
    }

    res.json({ message: "Project submitted and marked as complete!" });
  } catch (err) {
    next(err);
  }
};
exports.getInstructorStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const courses = await Course.find({ instructor: userId });

    const totalStudents = courses.reduce(
      (acc, course) => acc + course.enrolledCount,
      0,
    );
    
    const totalEarnings = totalStudents * 10;

    res.json({
      courses,
      totalCourses: courses.length,
      totalStudents,
      totalEarnings,
    });
  } catch (err) {
    next(err);
  }
};
