import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
  explanation: { type: String },
});

const quizzesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  visibility: { type: String, enum: ["public", "private"], required: true },
  timeLimit: { type: Number, required: true },
  passingScore: { type: Number, required: true },
  difficulty: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  assignedGroups: { type: [String], required: true },
  questions: {
    _id: false,
    type: [questionSchema],
    required: true,
  },
  questionsLength: { type: Number },
  attemptedStudents: {
    type: [mongoose.Types.ObjectId],
    ref: "Student",
    default: [],
  },
}, {
  timestamps: true,
});

export const MQuizzes = mongoose.model("Quizzes", quizzesSchema);
