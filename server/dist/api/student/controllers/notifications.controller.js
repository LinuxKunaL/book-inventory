"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const notification_service_1 = __importDefault(require("../services/notification.service"));
const handleError_1 = require("../../../utils/Error/handleError");
const getNotifications = async (req, res) => {
    try {
        const query = req.query;
        const student = req.student;
        const result = await notification_service_1.default.getNotifications(query, student);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = { getNotifications };
