"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MRecentActivity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recentActivitySchema = new mongoose_1.default.Schema({
    student: { type: mongoose_1.default.Types.ObjectId, ref: "Student", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String },
}, {
    timestamps: true,
});
exports.MRecentActivity = mongoose_1.default.model("RecentActivity", recentActivitySchema);
