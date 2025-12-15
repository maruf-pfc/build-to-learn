const router = require("express").Router();
const controller = require("./upload.controller");
const { auth } = require("../../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/", auth, upload.single("image"), controller.uploadImage);

module.exports = router;
