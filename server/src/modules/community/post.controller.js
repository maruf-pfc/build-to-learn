const Post = require("./post.model");

// Create Post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, type, tags, image } = req.body;
    const post = await Post.create({
      title,
      content,
      type, // 'blog' or 'forum'
      tags,
      image,
      author: req.user.id,
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// Get All Posts (with filters)
exports.getAllPosts = async (req, res, next) => {
  try {
    const { type, sort } = req.query;
    let query = {};
    if (type) query.type = type;

    let sortOption = { createdAt: -1 }; // Default: Newest
    if (sort === "top") {
      // Sort by upvotes count descending
    }

    let posts;
    if (sort === "top") {
      posts = await Post.aggregate([
        { $match: query },
        { $addFields: { upvotesCount: { $size: "$upvotes" } } },
        { $sort: { upvotesCount: -1 } },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "author",
          },
        },
        { $unwind: "$author" },
        { $project: { "author.passwordHash": 0 } },
      ]);
    } else {
      posts = await Post.find(query)
        .sort(sortOption)
        .populate("author", "name avatar role");
    }

    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// Get Single Post
exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar");

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Increment views
    post.views += 1;
    await post.save();

    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Add Comment
exports.addComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      content,
    });
    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar");

    res.json(updatedPost);
  } catch (err) {
    next(err);
  }
};

// Toggle Vote
exports.votePost = async (req, res, next) => {
  try {
    const { voteType } = req.body; // 'up' or 'down'
    const userId = req.user.id;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Remove existing votes
    post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
    post.downvotes = post.downvotes.filter((id) => id.toString() !== userId);

    if (voteType === "up") {
      post.upvotes.push(userId);
    } else if (voteType === "down") {
      post.downvotes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};
// Update Post
exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, tags, image, type } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.image = image || post.image;
    post.type = type || post.type;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check ownership (or admin)
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
