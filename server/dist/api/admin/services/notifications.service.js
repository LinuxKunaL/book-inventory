"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_model_1 = require("../../../models/notifications.model");
const AppError_1 = require("../../../utils/Error/AppError");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getNotifications = async (query) => {
    const page = query.page || 1;
    const type = query.type || "";
    const queryFIlter = {
        $and: [
            {
                type: { $regex: type, $options: "i" },
            },
        ],
    };
    try {
        const result = await notifications_model_1.MNotification.find(queryFIlter)
            .skip((page - 1) * 10)
            .limit(10)
            .populate({
            path: "private.school",
            select: "schoolName",
        });
        const totalNotifications = await notifications_model_1.MNotification.countDocuments(queryFIlter);
        return {
            notifications: result,
            totalNotifications,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = { getNotifications };
