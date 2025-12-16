const router = require("express").Router();

router.use("/auth", require("../modules/auth/auth.routes"));
router.use("/courses", require("../modules/course/course.routes"));
router.use("/users", require("../modules/users/user.routes"));
router.use("/community", require("../modules/community/post.routes"));
router.use("/admin", require("../modules/admin/admin.routes"));
router.use("/upload", require("../modules/upload/upload.routes"));
router.use(
  "/certificates",
  require("../modules/certificate/certificate.routes"),
);

module.exports = router;
