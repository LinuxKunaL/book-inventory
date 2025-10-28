"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const notifications_service_1 = __importDefault(require("../services/notifications.service"));
const handleError_1 = require("../../../utils/Error/handleError");
const getNotifications = async (req, res) => {
    try {
        const query = req.query;
        const result = await notifications_service_1.default.getNotifications(query);
        res.status(http_status_codes_1.default.OK).json(result);
        return;
    }
    catch (error) {
        (0, handleError_1.handleErrorResponse)(error, res);
    }
};
exports.default = { getNotifications };
