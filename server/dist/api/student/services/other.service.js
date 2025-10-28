"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_destination_1 = require("../../../functions/multer.destination");
const multer_filename_1 = require("../../../functions/multer.filename");
const date_fns_1 = require("date-fns");
const studentStats_model_1 = require("../../../models/studentStats.model");
const enrolledCourses_model_1 = require("../../../models/enrolledCourses.model");
const quizzes_model_1 = require("../../../models/quizzes.model");
const achievement_model_1 = require("../../../models/achievement.model");
const storage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: multer_destination_1.multerDestination,
        filename: multer_filename_1.multerFilename,
    }),
    preservePath: true,
});
const streakCounter = async (student) => {
    try {
        const today = (0, date_fns_1.startOfDay)(new Date());
        const yesterday = (0, date_fns_1.startOfDay)((0, date_fns_1.subDays)(new Date(), 1));
        const lastUpdate = student.lastStreakUpdate
            ? (0, date_fns_1.startOfDay)(student.lastStreakUpdate)
            : null;
        if (!lastUpdate) {
            // First streak entry
            student.streak = 1;
            student.lastStreakUpdate = new Date();
        }
        else if ((0, date_fns_1.isAfter)(today, lastUpdate)) {
            // New day → check if yesterday was last update
            if (lastUpdate.getTime() === yesterday.getTime()) {
                // ✅ Continued streak
                student.streak += 1;
            }
            else {
                // ❌ Missed a day → reset streak
                student.streak = 1;
            }
            student.lastStreakUpdate = new Date();
        }
        // If lastUpdate == today → do nothing (already counted)
        await student.save();
        return student.streak;
    }
    catch (error) {
        console.error(error);
    }
};
const getOverviewData = async (userId) => {
    const [gridOverview] = await studentStats_model_1.MStudentStats.aggregate([
        {
            $match: {
                student: userId,
            },
        },
        {
            $project: {
                overallProgress: 1,
                "courses.completed": 1,
                "courses.totalHours": 1,
                achievements: { $size: "$achievements" },
            },
        },
    ]);
    const progressCourses = await enrolledCourses_model_1.MEnrolledCourses.find({
        student: userId,
        isCompleted: false,
    })
        .populate({
        path: "course",
        select: "title",
    })
        .select("progress currentLessonTitle")
        .limit(2);
    const { achievements } = await studentStats_model_1.MStudentStats.findOne({
        student: userId,
    })
        .select("achievements")
        .populate({
        path: "achievements.achievement",
        options: { limit: 3 },
    });
    const quizResults = await quizzes_model_1.MQuizzes.find({
        visibility: "public",
    })
        .select("title difficulty timeLimit description")
        .limit(3);
    return {
        gridOverview,
        progressCourses,
        achievements,
        quizResults,
    };
};
const getAchievements = async (userId) => {
    const { achievements } = await studentStats_model_1.MStudentStats.findOne({
        student: userId,
    })
        .select("achievements")
        .populate({
        path: "achievements.achievement",
    });
    const lockAchievements = await achievement_model_1.MAchievement.find();
    const filterLock = lockAchievements.filter((ach) => !achievements.some((ach2) => ach2.achievement._id.equals(ach._id)));
    return { unlock: achievements, look: filterLock };
};
exports.default = {
    getAchievements,
    getOverviewData,
    streakCounter,
    storage,
};
