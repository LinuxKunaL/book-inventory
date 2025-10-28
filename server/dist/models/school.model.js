"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSchool = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schoolSchema = new mongoose_1.default.Schema({
    schoolName: { type: String, required: true },
    contactPersonDetails: { type: String, required: true },
    schoolLocation: { type: String, required: true },
    boardOfEducation: { type: String, required: true },
    mailId: { type: String, required: true, unique: true },
    coordinatorName: { type: String, required: true },
    coordinatorContact: { type: String, required: true, unique: true },
    createdAt: { type: String },
});
schoolSchema.pre("save", function (next) {
    this.createdAt = new Date().toDateString();
    next();
});
exports.MSchool = mongoose_1.default.model("Schools", schoolSchema);
