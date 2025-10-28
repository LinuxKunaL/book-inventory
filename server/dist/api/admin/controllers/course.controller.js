"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const course_service_1 = __importDefault(require("../services/course.service"));
const zodErrorFormat_1 = require("../../../utils/Error/zodErrorFormat");
const handleError_1 = require("../../../utils/Error/handleError");
const course_validator_1 = require("../validator/course.validator");
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
        const { id } = req.params;
        const result = await course_service_1.default.getCourseById(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const createCourse = async (req, res) => {
    const { error, data } = course_validator_1.coursesFieldsValidator.safeParse(req.body);
    if (error) {
        const result = (0, zodErrorFormat_1.zodError)(error.errors);
        res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
        return;
    }
    try {
        const result = await course_service_1.default.createCourse(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const updateCourse = async (req, res) => {
    try {
        const { error, data } = course_validator_1.coursesFieldsValidator.safeParse(req.body);
        if (error) {
            const result = (0, zodErrorFormat_1.zodError)(error.errors);
            res.status(http_status_codes_1.default.BAD_REQUEST).json({ error: result });
            return;
        }
        const result = await course_service_1.default.updateCourse(data);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await course_service_1.default.deleteCourse(id);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = {
    getCourseById,
    updateCourse,
    deleteCourse,
    getCourses,
    createCourse,
};
