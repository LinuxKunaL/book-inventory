"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOtpModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MOtp = new mongoose_1.default.Schema({
    mobileNumber: { type: String, required: true },
    otp: { type: Number, required: true },
});
exports.MOtpModel = mongoose_1.default.model("Otp", MOtp);
