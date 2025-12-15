const router = require("express").Router();
const controller = require("./post.controller");
const { auth } = require("../../middlewares/auth.middleware");

// Public (View)
router.get("/", controller.getAllPosts);
router.get("/:id", controller.getPostById);

// Protected (Create, Comment, Vote)
router.post("/", auth, controller.createPost);
router.post("/:id/comments", auth, controller.addComment);
router.post("/:id/vote", auth, controller.votePost);
router.put("/:id", auth, controller.updatePost);
router.delete("/:id", auth, controller.deletePost);

module.exports = router;
