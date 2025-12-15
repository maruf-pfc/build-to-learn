const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },

    course: { type: Schema.Types.ObjectId, ref: "Course" },

    tags: [String],
    type: {
      type: String,
      enum: ["blog", "discussion", "question"],
      default: "discussion",
    },

    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = model("Post", PostSchema);
