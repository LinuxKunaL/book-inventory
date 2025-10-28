"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validator_1 = require("./auth.validator");
const zodErrorFormat_1 = require("../../utils/Error/zodErrorFormat");
const handleError_1 = require("../../utils/Error/handleError");
const adminLogin = async (req, res) => {
    const { error, data } = auth_validator_1.adminLoginValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await auth_service_1.default.adminLogin(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const adminMe = async (req, res) => {
    try {
        const result = await auth_service_1.default.adminMe(req.admin.id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const studentRegister = async (req, res) => {
    const { error, data } = auth_validator_1.studentRegValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await auth_service_1.default.studentRegister(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const studentLogin = async (req, res) => {
    try {
        const result = await auth_service_1.default.studentLogin(req.body);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const requestOtp = async (req, res) => {
    const { data, error } = auth_validator_1.requestOtpValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await auth_service_1.default.requestOtp(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const studentMe = async (req, res) => {
    try {
        const result = await auth_service_1.default.studentMe(req.student.id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updateStudent = async (req, res) => {
    try {
        const userId = req.student.id;
        const result = await auth_service_1.default.updateStudent(userId, req.body);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updatePassword = async (req, res) => {
    try {
        const userId = req.student.id;
        const result = await auth_service_1.default.updateStudentPassword(userId, req.body);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = {
    adminMe,
    studentMe,
    adminLogin,
    requestOtp,
    updatePassword,
    updateStudent,
    studentLogin,
    studentRegister,
};
