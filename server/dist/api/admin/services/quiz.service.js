"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = require("../../../utils/Error/AppError");
const quizzes_model_1 = require("../../../models/quizzes.model");
const attemptQuiz_model_1 = require("../../../models/attemptQuiz.model");
const mongoose_1 = require("mongoose");
const createQuiz = async (data) => {
    try {
        await quizzes_model_1.MQuizzes.create(data);
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getQuizzes = async (query) => {
    const page = query.page || 1;
    const search = query.search || "";
    const assignedGroups = query.class || "";
    const difficulty = query.difficulty || "";
    const queryFIlter = {
        $and: [
            {
                title: { $regex: search, $options: "i" },
                assignedGroups: { $regex: assignedGroups, $options: "i" },
                difficulty: { $regex: difficulty, $options: "i" },
            },
        ],
    };
    try {
        const result = await quizzes_model_1.MQuizzes.find(queryFIlter)
            .select("-__v -questions")
            .skip((page - 1) * 10)
            .limit(10);
        const totalQuizzes = await quizzes_model_1.MQuizzes.countDocuments(queryFIlter);
        const [totalCreatedQuizzes, totalPublicQuizzes, attemptedStudents, averageScore,] = await Promise.all([
            quizzes_model_1.MQuizzes.countDocuments(),
            quizzes_model_1.MQuizzes.countDocuments({ visibility: "public" }),
            quizzes_model_1.MQuizzes.aggregate([
                {
                    $project: {
                        attemptedCount: { $size: "$attemptedStudents" },
                    },
                },
                {
                    $group: {
                        _id: null,
                        attemptedStudentsCount: { $sum: "$attemptedCount" },
                    },
                },
            ]),
            attemptQuiz_model_1.MAttemptQuiz.aggregate([
                {
                    $group: {
                        _id: null,
                        averageScore: { $avg: "$score" },
                    },
                },
            ]),
        ]);
        const stats = {
            totalQuizzes: totalCreatedQuizzes,
            totalPublicQuizzes: totalPublicQuizzes,
            averageScore: averageScore[0]?.averageScore || 0,
            studentsAttempted: attemptedStudents[0]?.attemptedStudentsCount || 0,
        };
        return {
            quizzes: result,
            totalQuizzes,
            stats,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getQuizById = (id) => {
    try {
        const result = quizzes_model_1.MQuizzes.findById(id).select("-__v");
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const updateQuiz = async (data) => {
    try {
        await quizzes_model_1.MQuizzes.findByIdAndUpdate(data._id, data, {
            new: true,
        });
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const deleteQuiz = async (id) => {
    try {
        const result = await quizzes_model_1.MQuizzes.findByIdAndDelete(id);
        if (!result) {
            throw new AppError_1.AppError("Quiz not found", http_status_codes_1.default.NOT_FOUND);
        }
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getParticipants = async (id, query) => {
    try {
        const page = query.page || 1;
        const status = query.status || "";
        const classStandard = query.classStandard || "";
        const queryFIlter = {
            $and: [
                {
                    status: { $regex: status, $options: "i" },
                },
            ],
        };
        const result = await attemptQuiz_model_1.MAttemptQuiz.find({ quiz: id, ...queryFIlter })
            .select("student result score timeSpent status completedAt")
            .populate({
            path: "student",
            select: "studentName email classStandard section school",
            match: { classStandard: { $regex: classStandard, $options: "i" } },
            populate: {
                path: "school",
                select: "schoolName",
            },
        })
            .skip((page - 1) * 10)
            .limit(10);
        const filterResult = result.filter((quiz) => quiz.student != null);
        const [totalParticipants, quizData] = await Promise.all([
            attemptQuiz_model_1.MAttemptQuiz.countDocuments({ quiz: id }),
            quizzes_model_1.MQuizzes.findById(id).select("title passingScore timeLimit"),
        ]);
        const [[totalScore], [totalPassed]] = await Promise.all([
            attemptQuiz_model_1.MAttemptQuiz.aggregate([
                {
                    $match: { quiz: new mongoose_1.Types.ObjectId(id) },
                },
                {
                    $group: {
                        _id: null,
                        totalScore: { $sum: "$score" },
                    },
                },
            ]),
            attemptQuiz_model_1.MAttemptQuiz.aggregate([
                {
                    $match: { quiz: new mongoose_1.Types.ObjectId(id), status: "passed" },
                },
                {
                    $group: {
                        _id: null,
                        totalPassed: { $sum: 1 },
                    },
                },
            ]),
        ]);
        const stats = {
            averageScore: Number(totalScore?.totalScore || 0 / totalParticipants || 0).toFixed(2),
            passingRate: Number((totalPassed?.totalScore || 0 / totalParticipants || 0) * 100).toFixed(2),
        };
        return {
            stats,
            quizData,
            participants: filterResult,
            totalParticipants,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    getQuizzes,
    getQuizById,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getParticipants,
};
