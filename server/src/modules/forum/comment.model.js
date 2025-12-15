const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },

    parent: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
  },
  { timestamps: true },
);

module.exports = model("Comment", CommentSchema);
