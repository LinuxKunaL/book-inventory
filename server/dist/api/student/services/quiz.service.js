"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const stats_service_1 = __importDefault(require("./stats.service"));
const activity_service_1 = require("./activity.service");
const AppError_1 = require("../../../utils/Error/AppError");
const quizzes_model_1 = require("../../../models/quizzes.model");
const attemptQuiz_model_1 = require("../../../models/attemptQuiz.model");
const studentStats_model_1 = require("../../../models/studentStats.model");
const getQuizzes = async (query, user) => {
    const page = query.page || 1;
    const search = query.search || "";
    const difficulty = query.difficulty || "";
    const queryFIlter = {
        $and: [
            {
                assignedGroups: { $in: user.classStandard },
                title: { $regex: search.trim(), $options: "i" },
                difficulty: { $regex: difficulty.trim(), $options: "i" },
            },
        ],
    };
    try {
        const result = await quizzes_model_1.MQuizzes.find(queryFIlter)
            .select("-__v -questions")
            .skip((page - 1) * 10)
            .limit(10);
        const totalQuizzes = await quizzes_model_1.MQuizzes.countDocuments(queryFIlter);
        return {
            quizzes: result,
            totalQuizzes,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getAttemptQuizzes = async (query, user) => {
    try {
        const page = query.page || 1;
        const search = query.search || "";
        const status = query.status || "";
        const difficulty = query.difficulty || "";
        const queryFIlter = {
            $and: [
                {
                    status: { $regex: status.trim(), $options: "i" },
                    difficulty: { $regex: difficulty.trim(), $options: "i" },
                    title: { $regex: search.trim(), $options: "i" },
                },
            ],
        };
        const result = await attemptQuiz_model_1.MAttemptQuiz.find({
            student: user.id,
            ...queryFIlter,
        })
            .select("-__v -result -questionsReview -student")
            .populate({
            path: "quiz",
            select: "-__v -questions -assignedGroups -attemptedStudents",
        })
            .skip((page - 1) * 10)
            .limit(10);
        const totalQuizzes = await attemptQuiz_model_1.MAttemptQuiz.countDocuments({
            student: user.id,
            ...queryFIlter,
        });
        const stats = await studentStats_model_1.MStudentStats.findOne({
            student: user.id,
        }).select("quizzes");
        return {
            quizzes: result,
            totalQuizzes,
            stats: stats.quizzes,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const attemptQuiz = async (id, user) => {
    try {
        const alreadyAttempted = await attemptQuiz_model_1.MAttemptQuiz.findOne({
            student: user.id,
            quiz: id,
        });
        if (alreadyAttempted) {
            throw new AppError_1.AppError("You have already attempted this quiz", http_status_codes_1.default.BAD_REQUEST);
        }
        const result = await quizzes_model_1.MQuizzes.findOne({
            _id: id,
            assignedGroups: { $in: [user.classStandard] },
            visibility: "public",
        }).select("-__v -questions.correctAnswer -assignedGroups -visibility -difficulty");
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
};
const submitQuiz = async (data, user) => {
    try {
        const AttemptExists = await attemptQuiz_model_1.MAttemptQuiz.findOne({
            student: user.id,
            quizId: data.quizId,
        });
        if (AttemptExists) {
            throw new AppError_1.AppError("You have already attempted this quiz", http_status_codes_1.default.BAD_REQUEST);
        }
        const quiz = await quizzes_model_1.MQuizzes.findById(data.quizId);
        if (!quiz) {
            throw new AppError_1.AppError("Quiz not found", http_status_codes_1.default.NOT_FOUND);
        }
        let result = {
            correct: 0,
            wrong: 0,
            notAttempted: 0,
            totalQuestions: quiz.questionsLength,
        };
        let questionsReview = [];
        for (const question of quiz.questions) {
            const answer = data.answers[question.id];
            const correct = question.correctAnswer;
            if (answer === undefined) {
                result.notAttempted++;
            }
            else if (answer === correct) {
                result.correct++;
            }
            else {
                result.wrong++;
            }
            questionsReview.push({
                ...question,
                studentAnswer: answer,
            });
        }
        const score = (result.correct / result.totalQuestions) * 100;
        const status = score >= quiz.passingScore ? "passed" : "failed";
        await attemptQuiz_model_1.MAttemptQuiz.create({
            title: quiz.title,
            difficulty: quiz.difficulty,
            quiz: data.quizId,
            completedAt: data.completedAt,
            timeSpent: data.timeSpent,
            student: user.id,
            result,
            status,
            questionsReview,
            score,
        });
        const { title } = await quizzes_model_1.MQuizzes.findOneAndUpdate({ _id: data.quizId }, {
            $push: {
                attemptedStudents: user.id,
            },
        }, {
            new: true,
        }).select("title");
        (0, activity_service_1.pushActivity)(user.id, "quiz", `Completed '${title}' quiz`, "emerald");
        stats_service_1.default.updateCompletedQuizzes(user.id);
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getQuizResult = async (id) => {
    try {
        const result = await attemptQuiz_model_1.MAttemptQuiz.findById(id).select("-__v").populate({
            path: "quiz",
            select: "title passingScore questionsLength timeLimit",
        });
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    getAttemptQuizzes,
    attemptQuiz,
    submitQuiz,
    getQuizResult,
    getQuizzes,
};
