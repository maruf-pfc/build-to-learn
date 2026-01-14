const router = require("express").Router();
const controller = require("./auth.controller");
const { auth } = require("../../middlewares/auth.middleware");

const { body } = require("express-validator");
const { validate } = require("../../middlewares/validate.middleware");

// Validation rules
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").isIn(["student", "instructor"]).withMessage("Invalid role"),
  validate,
];

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  validate,
];

router.post("/register", registerValidation, controller.register);
router.post("/login", loginValidation, controller.login);
router.post("/logout", controller.logout);
router.get("/me", auth, controller.getMe);

module.exports = router;
