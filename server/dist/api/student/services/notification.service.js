"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = require("../../../utils/Error/AppError");
const notifications_model_1 = require("../../../models/notifications.model");
const student_model_1 = require("../../../models/student.model");
const getNotifications = async (query, student) => {
    const page = query.page || 1;
    try {
        const result = await notifications_model_1.MNotification.find({
            $or: [
                { private: { $exists: false } },
                { private: null },
                {
                    private: { $exists: true },
                    $and: [
                        {
                            $or: [
                                { "private.school": { $exists: false } },
                                { "private.school": student.school },
                            ],
                        },
                        {
                            $or: [
                                { "private.classStandard": { $exists: false } },
                                { "private.classStandard": student.classStandard },
                            ],
                        },
                        {
                            $or: [
                                { "private.section": { $exists: false } },
                                { "private.section": student.section },
                            ],
                        },
                    ],
                },
            ],
        })
            .select("-__v -updatedAt")
            .skip((page - 1) * 10)
            .limit(10);
        const totalNotifications = await notifications_model_1.MNotification.countDocuments();
        // Reset notification count for the user
        await student_model_1.MStudent.updateOne({ _id: student.id }, { $set: { notificationCount: 0 } });
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
