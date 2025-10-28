"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentStats_model_1 = require("../../../models/studentStats.model");
const enrolledCourses_model_1 = require("../../../models/enrolledCourses.model");
const attemptQuiz_model_1 = require("../../../models/attemptQuiz.model");
const achievements_service_1 = __importDefault(require("./achievements.service"));
const updateCourseTotalHours = async (userId, watchSeconds) => {
    try {
        await studentStats_model_1.MStudentStats.findOneAndUpdate({ student: userId }, { $inc: { "courses.totalHours": watchSeconds } });
        achievements_service_1.default.unlockCourseHoursAchievements(userId, watchSeconds);
    }
    catch (error) {
        console.log("❌ updateCourseTotalHours error: ", error);
    }
};
const updateCompletedCourses = async (userId) => {
    try {
        const [completed, inProgress] = await Promise.all([
            enrolledCourses_model_1.MEnrolledCourses.countDocuments({
                student: userId,
                isCompleted: true,
            }),
            enrolledCourses_model_1.MEnrolledCourses.countDocuments({
                student: userId,
                isCompleted: false,
            }),
        ]);
        // check for achievements
        if (completed) {
            achievements_service_1.default.unlockCourseAchievements(userId, completed);
        }
        await studentStats_model_1.MStudentStats.findOneAndUpdate({ student: userId }, {
            $set: {
                "courses.completed": completed,
                "courses.inProgress": inProgress,
            },
        });
    }
    catch (error) {
        console.log("❌ updateCompletedCourses error: ", error);
    }
};
const updateCompletedQuizzes = async (userId) => {
    try {
        const [stats] = await attemptQuiz_model_1.MAttemptQuiz.aggregate([
            {
                $match: { student: userId },
            },
            {
                $facet: {
                    passed: [{ $match: { status: "passed" } }, { $count: "count" }],
                    attempted: [{ $count: "count" }],
                    averageScore: [
                        { $match: { status: "passed" } },
                        { $group: { _id: null, avg: { $avg: "$score" } } },
                    ],
                },
            },
            {
                $project: {
                    passed: { $ifNull: [{ $arrayElemAt: ["$passed.count", 0] }, 0] },
                    attempted: {
                        $ifNull: [{ $arrayElemAt: ["$attempted.count", 0] }, 0],
                    },
                    averageScore: {
                        $ifNull: [{ $arrayElemAt: ["$averageScore.avg", 0] }, 0],
                    },
                },
            },
        ]);
        const { passed, attempted, averageScore } = stats || {
            passed: 0,
            attempted: 0,
            averageScore: 0,
        };
        if (attempted) {
            achievements_service_1.default.unlockQuizAchievements(userId, attempted);
        }
        await studentStats_model_1.MStudentStats.findOneAndUpdate({ student: userId }, {
            $set: {
                "quizzes.passed": passed,
                "quizzes.attempted": attempted,
                "quizzes.averageScore": Number(averageScore).toFixed(2),
            },
        });
    }
    catch (error) {
        console.log("❌ updateCompletedQuizzes error:", error);
    }
};
const updateOverallProgress = async (userId) => {
    try {
        const [courseStats] = await enrolledCourses_model_1.MEnrolledCourses.aggregate([
            {
                $match: {
                    student: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    averageProgress: { $avg: "$progress" },
                },
            },
        ]);
        const [scoreStats] = await attemptQuiz_model_1.MAttemptQuiz.aggregate([
            {
                $match: {
                    student: userId,
                    status: "passed",
                },
            },
            {
                $group: {
                    _id: null,
                    averageScore: { $avg: "$score" },
                },
            },
        ]);
        const { averageProgress } = courseStats || { averageProgress: 0 };
        const { averageScore } = scoreStats || { averageScore: 0 };
        const overallProgress = Number((averageProgress + averageScore) / 2).toFixed(2);
        await studentStats_model_1.MStudentStats.findOneAndUpdate({ student: userId }, {
            $set: {
                overallProgress,
            },
        });
    }
    catch (error) {
        console.log("❌ updateOverallProgress error:", error);
    }
};
exports.default = {
    updateOverallProgress,
    updateCourseTotalHours,
    updateCompletedCourses,
    updateCompletedQuizzes,
};
