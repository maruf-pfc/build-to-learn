const User = require("../users/user.model");

exports.getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await User.find({ role: "student" })
      .sort({ points: -1 })
      .limit(10)
      .select("name avatar points");

    res.json(leaderboard);
  } catch (err) {
    next(err);
  }
};
