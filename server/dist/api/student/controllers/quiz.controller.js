"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const handleError_1 = require("../../../utils/Error/handleError");
const quiz_service_1 = __importDefault(require("../services/quiz.service"));
const getQuizzes = async (req, res) => {
    try {
        const query = req.query;
        const user = req.student;
        const result = await quiz_service_1.default.getQuizzes(query, user);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getAttemptQuizzes = async (req, res) => {
    try {
        const query = req.query;
        const user = req.student;
        const result = await quiz_service_1.default.getAttemptQuizzes(query, user);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const attemptQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.student;
        const result = await quiz_service_1.default.attemptQuiz(id, user);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const submitQuiz = async (req, res) => {
    try {
        const data = req.body;
        const user = req.student;
        const result = await quiz_service_1.default.submitQuiz(data, user);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getQuizResult = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await quiz_service_1.default.getQuizResult(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = {
    getAttemptQuizzes,
    submitQuiz,
    getQuizzes,
    attemptQuiz,
    getQuizResult,
};
