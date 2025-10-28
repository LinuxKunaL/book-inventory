"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAttemptQuiz = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const resultSchema = new mongoose_1.default.Schema({
    correct: { type: Number, required: true },
    wrong: { type: Number, required: true },
    notAttempted: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
});
const questionReviewSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    studentAnswer: { type: Number, required: true },
    explanation: { type: String },
});
const attemptQuizSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    student: { type: mongoose_1.default.Types.ObjectId, ref: "Student", required: true },
    quiz: { type: mongoose_1.default.Types.ObjectId, ref: "Quizzes", required: true },
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
exports.MAttemptQuiz = mongoose_1.default.model("AttemptQuiz", attemptQuizSchema);
