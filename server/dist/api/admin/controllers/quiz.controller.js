"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const handleError_1 = require("../../../utils/Error/handleError");
const quiz_validator_1 = require("../validator/quiz.validator");
const zodErrorFormat_1 = require("../../../utils/Error/zodErrorFormat");
const quiz_service_1 = __importDefault(require("../services/quiz.service"));
const getQuizzes = async (req, res) => {
    try {
        const query = req.query;
        const result = await quiz_service_1.default.getQuizzes(query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getQuizById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await quiz_service_1.default.getQuizById(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const createQuiz = async (req, res) => {
    const { error, data } = quiz_validator_1.quizzesFieldsValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await quiz_service_1.default.createQuiz(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updateQuiz = async (req, res) => {
    try {
        const { error, data } = quiz_validator_1.quizzesFieldsValidator.safeParse(req.body);
        if (error) {
            const result = (0, zodErrorFormat_1.zodError)(error.errors);
            res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
            return;
        }
        const result = await quiz_service_1.default.updateQuiz(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const deleteQuiz = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await quiz_service_1.default.deleteQuiz(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getParticipants = async (req, res) => {
    try {
        const { id } = req.params;
        const query = req.query;
        const result = await quiz_service_1.default.getParticipants(id, query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
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
