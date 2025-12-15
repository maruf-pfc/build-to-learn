const User = require("../users/user.model");
const Course = require("../course/course.model");

exports.getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const students = await User.countDocuments({ role: "student" });
    const instructors = await User.countDocuments({ role: "instructor" });

    res.json({ totalUsers, totalCourses, students, instructors });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-passwordHash")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId, role } = req.body;
    await User.findByIdAndUpdate(userId, { role });
    res.json({ message: "Role updated" });
  } catch (err) {
    next(err);
  }
};
