import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  correct: { type: Number, required: true },
  wrong: { type: Number, required: true },
  notAttempted: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
});

const questionReviewSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: Number, required: true },
  studentAnswer: { type: Number, required: true },
  explanation: { type: String },
});

const attemptQuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  student: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
  quiz: { type: mongoose.Types.ObjectId, ref: "Quizzes", required: true },
  result: {
    _id: false,
    type: resultSchema,
    required: true,
  },
  questionsReview: [
    {
      _id: false,
      type: questionReviewSchema,
      required: true,
    },
  ],
  status: { type: String, enum: ["passed", "failed"], required: true },
  score: { type: Number, required: true },
  timeSpent: { type: Number, required: true },
  completedAt: { type: Date, required: true },
});

export const MAttemptQuiz = mongoose.model("AttemptQuiz", attemptQuizSchema);
