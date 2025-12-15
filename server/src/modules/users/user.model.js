const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },

    role: {
      type: String,
      enum: ["public", "student", "instructor", "admin"],
      default: "public",
    },

    avatar: { type: String, default: null },
    bio: { type: String, default: "" },
    headline: { type: String, default: "" },
    cv: { type: String, default: null },

    skills: [{ type: String }],

    experience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
        current: { type: Boolean, default: false },
      },
    ],

    education: [
      {
        school: String,
        degree: String,
        fieldOfStudy: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],

    socialLinks: {
      website: String,
      linkedin: String,
      github: String,
      twitter: String,
    },

    points: { type: Number, default: 0 },

    enrolledCourses: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course" },
        enrolledAt: { type: Date, default: Date.now },
        completedAt: { type: Date, default: null },
        progress: { type: Number, default: 0 },
        completedModules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
      },
    ],
  },
  { timestamps: true },
);

module.exports = model("User", UserSchema);
