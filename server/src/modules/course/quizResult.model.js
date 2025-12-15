const { Schema, model } = require("mongoose");

const QuizResultSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },

    score: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    passed: { type: Boolean, default: false },

    answers: [
      {
        questionId: String,
        answer: Schema.Types.Mixed,
        isCorrect: Boolean,
      },
    ],

    cheatingFlags: [
      {
        type: { type: String, enum: ["blur", "paste", "other"] },
        timestamp: { type: Date, default: Date.now },
        details: String,
      },
    ],

    attemptDate: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

module.exports = model("QuizResult", QuizResultSchema);
