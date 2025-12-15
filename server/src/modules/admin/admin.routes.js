const router = require("express").Router();
const controller = require("./admin.controller");
const { auth } = require("../../middlewares/auth.middleware");

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") next();
  else res.status(403).json({ message: "Admin access required" });
};

router.get("/stats", auth, adminOnly, controller.getStats);
router.get("/users", auth, adminOnly, controller.getAllUsers);
router.put("/users/role", auth, adminOnly, controller.updateUserRole);

module.exports = router;
