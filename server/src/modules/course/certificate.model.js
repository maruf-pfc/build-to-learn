const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const CertificateSchema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },

    uniqueId: { type: String, default: uuidv4, unique: true },
    issueDate: { type: Date, default: Date.now },

    certificateUrl: { type: String },
  },
  { timestamps: true },
);

module.exports = model("Certificate", CertificateSchema);
