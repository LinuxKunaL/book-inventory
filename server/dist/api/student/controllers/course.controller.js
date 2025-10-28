"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const course_service_1 = __importDefault(require("../services/course.service"));
const handleError_1 = require("../../../utils/Error/handleError");
const getCourses = async (req, res) => {
    try {
        const query = req.query;
        const result = await course_service_1.default.getCourses(query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.id;
        const studentId = req.student.id;
        const result = await course_service_1.default.getCourseById(studentId, courseId);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.student.id;
        const result = await course_service_1.default.getEnrolledCourses(userId);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const courseEnrollment = async (req, res) => {
    try {
        const courseId = req.body.id;
        const userId = req.student.id;
        const result = await course_service_1.default.courseEnrollment(courseId, userId);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updateProgress = async (req, res) => {
    try {
        const userId = req.student.id;
        const data = req.body;
        const result = await course_service_1.default.updateProgress(userId, data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = {
    updateProgress,
    courseEnrollment,
    getEnrolledCourses,
    getCourseById,
    getCourses,
};
