const { Schema, model } = require("mongoose");

const CertificateSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    courseTitle: { type: String, required: true },
    userName: { type: String, required: true },
    instructorName: { type: String, required: true },
    issueDate: { type: Date, default: Date.now },
    certificateId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

module.exports = model("Certificate", CertificateSchema);
