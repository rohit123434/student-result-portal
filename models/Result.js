import mongoose from "mongoose";
import { nanoid } from "nanoid";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mark: { type: Number, required: true }
});

const resultSchema = new mongoose.Schema({
  shortId: { type: String, default: () => nanoid(6), unique: true },
  studentName: { type: String, required: true },
  rollNo: { type: String, required: true },
  class: { type: String, required: true },
  subjects: [subjectSchema]
}, { timestamps: true });

resultSchema.methods.total = function () {
  return this.subjects.reduce((sum, s) => sum + s.mark, 0);
};

resultSchema.methods.percentage = function () {
  return this.total() / this.subjects.length;
};

resultSchema.methods.grade = function () {
  const p = this.percentage();
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  return "F";
};

export default mongoose.model("Result", resultSchema);
