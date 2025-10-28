"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MQuizzes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    id: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
});
const quizzesSchema = new mongoose_1.default.Schema({
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
        type: [mongoose_1.default.Types.ObjectId],
        ref: "Student",
        default: [],
    },
}, {
    timestamps: true,
});
exports.MQuizzes = mongoose_1.default.model("Quizzes", quizzesSchema);
