const { Schema, model } = require("mongoose");

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String },

    slug: { type: String, required: true, unique: true },
    level: { type: String, default: "Beginner" },
    duration: { type: Number, default: 0 }, // in minutes
    price: { type: Number, default: 0 },
    published: { type: Boolean, default: false },

    instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],

    // Basic stats
    enrolledCount: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = model("Course", CourseSchema);
