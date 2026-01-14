const Certificate = require("./certificate.model");
const User = require("../users/user.model");
const Course = require("../course/course.model");

exports.generateCertificate = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    // 1. Verify Completion
    const user = await User.findById(userId).populate("enrolledCourses.course");
    const enrollment = user.enrolledCourses.find(
      (e) => e.course._id.toString() === courseId,
    );

    if (!enrollment) return res.status(403).json({ message: "Not enrolled" });
    if (!enrollment.completedAt) {
      return res.status(400).json({ message: "Course not completed yet." });
    }

    // 2. Check if already exists
    let cert = await Certificate.findOne({ user: userId, course: courseId });
    if (cert) {
      return res.json(cert);
    }

    // 3. Create new
    const course = await Course.findById(courseId).populate("instructor");

    // Generate simple unique ID
    const certificateId = `CERT-${userId}-${courseId}-${Date.now()}`;

    cert = await Certificate.create({
      user: userId,
      course: courseId,
      courseTitle: course.title,
      userName: user.name,
      instructorName: course.instructor
        ? course.instructor.name
        : "LMS Instructor",
      certificateId,
      issueDate: new Date(),
    });

    res.status(201).json(cert);
  } catch (err) {
    next(err);
  }
};

exports.getMyCertificates = async (req, res, next) => {
  try {
    const certs = await Certificate.find({ user: req.user.id }).sort(
      "-createdAt",
    );
    res.json(certs);
  } catch (err) {
    next(err);
  }
};

exports.getCertificateById = async (req, res, next) => {
  try {
    const cert = await Certificate.findOne({ certificateId: req.params.id });
    if (!cert)
      return res.status(404).json({ message: "Certificate not found" });
    res.json(cert);
  } catch (err) {
    next(err);
  }
};
