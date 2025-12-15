const router = require("express").Router();
const controller = require("./forum.controller");
const { auth } = require("../../middlewares/auth.middleware");

// Posts
router.get("/posts", controller.getAllPosts);
router.post("/posts", auth, controller.createPost);
router.get("/posts/:id", controller.getPostById);

// Comments
router.post("/posts/:postId/comments", auth, controller.createComment);

module.exports = router;
