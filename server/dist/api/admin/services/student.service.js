"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const student_model_1 = require("../../../models/student.model");
const AppError_1 = require("../../../utils/Error/AppError");
const studentStats_model_1 = require("../../../models/studentStats.model");
const recentActivity_model_1 = require("../../../models/recentActivity.model");
const createStudent = async (data) => {
    try {
        const result = await student_model_1.MStudent.create(data);
        await studentStats_model_1.MStudentStats.create({ student: result._id });
        return {
            status: "success",
        };
    }
    catch (error) {
        console.log(error);
        if (error.code === 11000) {
            throw new AppError_1.AppError("Student already exist", http_status_codes_1.default.BAD_REQUEST);
        }
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getStudents = async (query) => {
    const page = query.page || 1;
    const search = query.search || "";
    const classStandard = query.class || "";
    const section = query.section || "";
    const school = query.school || "";
    const queryFIlter = {
        $and: [
            {
                studentName: { $regex: search, $options: "i" },
                classStandard: { $regex: classStandard, $options: "i" },
                section: { $regex: section, $options: "i" },
            },
            school
                ? {
                    school: new mongoose_1.Types.ObjectId(school),
                }
                : {},
        ],
    };
    try {
        const result = await student_model_1.MStudent.find(queryFIlter)
            .select("-password")
            .populate({
            path: "school",
            select: ["schoolName"],
        })
            .skip((page - 1) * 10)
            .limit(10);
        const totalStudent = await student_model_1.MStudent.countDocuments(queryFIlter);
        return {
            students: result,
            totalStudent,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const updateStudent = async (data) => {
    try {
        const result = await student_model_1.MStudent.findByIdAndUpdate(data._id, data, {
            new: true,
        });
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getStudentById = async (id) => {
    try {
        const personalInfo = await student_model_1.MStudent.findById(id)
            .select("-password -__v -updatedAt -lastStreakUpdate -notificationCount")
            .populate({
            path: "school",
            select: "schoolName",
        });
        const statsInfo = await studentStats_model_1.MStudentStats.findOne({
            student: id,
        }).populate({
            path: "achievements.achievement",
            select: "title icon",
        });
        const recentActivities = await recentActivity_model_1.MRecentActivity.find({
            student: id,
        })
            .limit(5)
            .sort({
            createdAt: -1,
        })
            .select("-__v -updatedAt");
        return {
            personalInfo,
            academicInfo: {
                overallProgress: statsInfo.overallProgress,
                courseCompleted: statsInfo.courses.completed,
                quizzesProgressed: `${statsInfo.quizzes.passed}/${statsInfo.quizzes.attempted}`,
                averageScore: statsInfo.quizzes.averageScore,
            },
            achievements: statsInfo.achievements,
            recentActivities,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    getStudentById,
    updateStudent,
    createStudent,
    getStudents,
};
