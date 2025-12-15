const { Schema, model } = require("mongoose");

const SubModuleSchema = new Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["video", "documentation", "mcq", "summary", "project", "text"],
    required: true,
  },
  content: { type: String }, // For markdown, can be long text
  videoUrl: { type: String }, // For video type

  // For MCQ
  questions: [
    {
      text: { type: String, required: true },
      type: {
        type: String,
        enum: ["single", "multiple", "text"], // multiple choice, multiple select, short answer
        default: "single",
      },
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
      correctAnswer: { type: String }, // For text type
      points: { type: Number, default: 10 },
      explanation: { type: String },
    },
  ],

  quizSettings: {
    timeLimit: { type: Number }, // in minutes
    passingScore: { type: Number, default: 70 }, // percentage
    shuffleQuestions: { type: Boolean, default: false },
  },

  // For Project
  repoLinkPlaceholder: { type: String }, // Instruction for submission
});

const ModuleSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    order: { type: Number, default: 0 },

    subModules: [SubModuleSchema],
  },
  { timestamps: true },
);

module.exports = model("Module", ModuleSchema);
