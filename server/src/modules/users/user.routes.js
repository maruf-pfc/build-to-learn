const router = require("express").Router();
const controller = require("./user.controller");
const { auth } = require("../../middlewares/auth.middleware");

router.get("/leaderboard", controller.getLeaderboard);

// Admin Routes
router.get("/", auth, controller.getAllUsers);
router.put("/profile", auth, controller.updateProfile);
router.delete("/profile", auth, controller.deleteAccount);

router.put("/:userId/role", auth, controller.updateUserRole);

module.exports = router;
