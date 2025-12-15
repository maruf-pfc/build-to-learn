const jwt = require("jsonwebtoken");
const User = require("../modules/users/user.model");

exports.auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    let token;

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (header) {
      token = header.split(" ")[1];
    }

    if (!token) return res.status(401).json({ message: "No token provided" });
    if (!token) return res.status(401).json({ message: "Invalid token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
