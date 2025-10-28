"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAchievement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const achievementSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    condition: { type: String, required: true },
});
exports.MAchievement = mongoose_1.default.model("Achievement", achievementSchema);
