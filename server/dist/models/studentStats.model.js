"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MStudentStats = void 0;
const mongoose_1 = require("mongoose");
const StudentStatsSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "Student" },
    achievements: [
        {
            _id: false,
            achievement: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Achievement",
            },
            unlockDate: { type: Date },
        },
    ],
    overallProgress: { type: Number, default: 0 },
    quizzes: {
        attempted: { type: Number, default: 0 },
        passed: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
    },
    courses: {
        inProgress: { type: Number, default: 0 },
        completed: { type: Number, default: 0 },
        totalHours: { type: Number, default: 0 },
    },
});
exports.MStudentStats = (0, mongoose_1.model)("studentStats", StudentStatsSchema);
