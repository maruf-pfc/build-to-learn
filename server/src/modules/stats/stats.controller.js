const User = require("../users/user.model");
const Course = require("../course/course.model");
const Certificate = require("../certificate/certificate.model");

exports.getPublicStats = async (req, res) => {
  try {
    const [learnersCount, coursesCount, certificatesCount, instructorsCount] =
      await Promise.all([
        User.countDocuments({ role: "student" }),
        Course.countDocuments({}),
        Certificate.countDocuments({}),
        User.countDocuments({ role: "instructor" }),
      ]);

    // Format numbers (e.g., 1000 -> 1K+) - optional, but maybe better done in frontend.
    // Sending raw numbers for now.

    res.status(200).json({
      activeLearners: learnersCount,
      courses: coursesCount,
      certificatesIssued: certificatesCount,
      instructors: instructorsCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
