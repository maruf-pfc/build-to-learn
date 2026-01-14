const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((err) => err.msg).join(", ");
    return res.status(400).json({ errors: errors.array(), message });
  }
  next();
};
