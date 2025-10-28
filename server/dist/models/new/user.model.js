"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../../config/app.config"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.methods.generateToken = function () {
    const payload = {
        proprietorId: this._id,
        username: this.username,
    };
    const token = jsonwebtoken_1.default.sign(payload, app_config_1.default.jwt.secret, {
        expiresIn: app_config_1.default.jwt.expiresIn,
    });
    return token;
};
exports.MUser = mongoose_1.default.model("User", userSchema);
