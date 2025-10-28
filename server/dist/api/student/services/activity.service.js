"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserActivity = exports.pushActivity = void 0;
const recentActivity_model_1 = require("../../../models/recentActivity.model");
const pushActivity = async (userId, name, description, color) => {
    try {
        await recentActivity_model_1.MRecentActivity.create({
            name,
            color,
            description,
            student: userId,
        });
        console.log("activity pushed", name);
    }
    catch (error) {
        console.log(error);
    }
};
exports.pushActivity = pushActivity;
const getUserActivity = async (userId) => {
    return await recentActivity_model_1.MRecentActivity.find({ student: userId });
};
exports.getUserActivity = getUserActivity;
