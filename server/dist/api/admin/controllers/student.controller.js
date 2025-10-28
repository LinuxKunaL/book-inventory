"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const zodErrorFormat_1 = require("../../../utils/Error/zodErrorFormat");
const student_service_1 = __importDefault(require("../services/student.service"));
const handleError_1 = require("../../../utils/Error/handleError");
const student_validator_1 = require("../validator/student.validator");
const createStudent = async (req, res) => {
    const { error, data } = student_validator_1.studentFieldsValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await student_service_1.default.createStudent(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getStudents = async (req, res) => {
    try {
        const query = req.query;
        const result = await student_service_1.default.getStudents(query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updateStudent = async (req, res) => {
    const { error, data } = student_validator_1.studentFieldsValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await student_service_1.default.updateStudent(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getStudentById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await student_service_1.default.getStudentById(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = {
    updateStudent,
    createStudent,
    getStudentById,
    getStudents,
};
