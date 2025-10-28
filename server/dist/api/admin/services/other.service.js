"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_destination_1 = require("../../../functions/multer.destination");
const multer_filename_1 = require("../../../functions/multer.filename");
const student_model_1 = require("../../../models/student.model");
const courses_model_1 = require("../../../models/courses.model");
const school_model_1 = require("../../../models/school.model");
const quizzes_model_1 = require("../../../models/quizzes.model");
const studentStats_model_1 = require("../../../models/studentStats.model");
const storage = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        destination: multer_destination_1.multerDestination,
        filename: multer_filename_1.multerFilename,
    }),
    preservePath: true,
});
const getOverviewData = async () => {
    const [totalStudents, activeCourses, totalSchool, totalQuizzes] = await Promise.all([
        student_model_1.MStudent.countDocuments(),
        courses_model_1.MCourses.countDocuments(),
        school_model_1.MSchool.countDocuments(),
        quizzes_model_1.MQuizzes.countDocuments(),
    ]);
    const studentsResult = await studentStats_model_1.MStudentStats.find({
        overallProgress: { $gte: 70 },
    })
        .populate({
        path: "student",
        select: "studentName",
        populate: {
            path: "school",
            select: "schoolName",
        },
    })
        .select("student overallProgress courses.completed quizzes.attempted");
    const recentQuizzes = await quizzes_model_1.MQuizzes.aggregate([
        {
            $sort: {
                updatedAt: -1,
            },
        },
        {
            $limit: 5,
        },
        {
            $project: {
                title: 1,
                difficulty: 1,
                description: 1,
                participantsCount: { $size: "$attemptedStudents" },
            },
        },
    ]);
    const topPerformingStudents = studentsResult.map((student) => {
        return {
            quizzesCompleted: student?.quizzes?.attempted ?? 0,
            coursesCompleted: student?.courses?.completed ?? 0,
            overallProgress: student?.overallProgress ?? 0,
            student: student?.student,
        };
    });
    const totalOverview = {
        totalStudents,
        activeCourses,
        totalSchool,
        totalQuizzes,
    };
    return {
        totalOverview,
        topPerformingStudents,
        recentQuizzes,
    };
};
exports.default = {
    getOverviewData,
    storage,
};
