const authService = require("./auth.service");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const { token, user } = await authService.register({
      name,
      email,
      password,
      role,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { token, user } = await authService.login(email, password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const User = require("../users/user.model");
    const user = await User.findById(req.user.id)
      .populate({
        path: "enrolledCourses.course",
        select: "title description thumbnail instructor slug",
      })
      .exec();

    if (!user) return res.status(404).json({ message: "User not found" });

    const userObj = user.toObject();
    delete userObj.passwordHash;
    res.json(userObj);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
