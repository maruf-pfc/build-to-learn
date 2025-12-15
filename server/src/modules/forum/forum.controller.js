const Post = require("./post.model");
const Comment = require("./comment.model");

// --- Posts ---
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, tags, type, courseId } = req.body;
    const post = await Post.create({
      title,
      content,
      tags,
      type,
      course: courseId,
      author: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const { type, courseId } = req.query;
    const query = {};
    if (type) query.type = type;
    if (courseId) query.course = courseId;

    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name avatar",
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Increment views
    post.views++;
    await post.save();

    // Get comments
    const comments = await Comment.find({ post: req.params.id })
      .populate("author", "name avatar")
      .sort({ createdAt: 1 });

    res.json({ post, comments });
  } catch (err) {
    next(err);
  }
};

// --- Comments ---
exports.createComment = async (req, res, next) => {
  try {
    const { content, parentId } = req.body;
    const { postId } = req.params;

    const comment = await Comment.create({
      content,
      post: postId,
      parent: parentId || null,
      author: req.user.id,
    });

    await comment.populate("author", "name avatar");

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
