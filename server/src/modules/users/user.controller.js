const User = require("./user.model");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select("name avatar points");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.updateUserRole = async (req, res, next) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });

    const { userId } = req.params;
    const { role } = req.body;

    if (!["student", "instructor", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    res.json(user);
  } catch (err) {
    next(err);
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    delete updates.role;
    delete updates.passwordHash;
    delete updates.email;
    delete updates.points;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true },
    ).select("-passwordHash");

    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);

    // Clear cookie
    res.clearCookie("token");
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    next(err);
  }
};
