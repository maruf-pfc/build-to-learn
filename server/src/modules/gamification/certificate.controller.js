const User = require("../users/user.model");
const Course = require("../course/course.model");

exports.generateCertificate = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      (e) => e.course.toString() === courseId,
    );

    if (!enrollment) {
      return res.status(403).json({ message: "Not enrolled" });
    }

    if (!enrollment.completedAt) {
      return res.status(400).json({ message: "Course not completed yet" });
    }

    // 7 Day Rule
    const enrolledDate = new Date(enrollment.enrolledAt);
    const now = new Date();
    const diffTime = Math.abs(now - enrolledDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 7) {
      return res.status(400).json({
        message: `Certificate available in ${7 - diffDays} days. Minimum 7 days enrollment required.`,
      });
    }

    // Return Certificate Data
    const course = await Course.findById(courseId);

    res.json({
      studentName: user.name,
      courseTitle: course.title,
      instructorName: course.instructor ? "Instructor" : "LMS",
      completedAt: enrollment.completedAt,
      certificateId: `CERT-${userId}-${courseId}-${Date.now()}`,
    });
  } catch (err) {
    next(err);
  }
};
