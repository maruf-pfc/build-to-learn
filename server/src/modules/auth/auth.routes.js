const router = require("express").Router();
const controller = require("./auth.controller");
const { auth } = require("../../middlewares/auth.middleware");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
router.get("/me", auth, controller.getMe);

module.exports = router;
