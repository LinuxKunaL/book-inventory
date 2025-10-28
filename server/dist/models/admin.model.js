"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = __importDefault(require("../config/app.config"));
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    gmail: { type: String, required: true },
    password: { type: String, required: true },
});
AdminSchema.methods.generateToken = function () {
    const payload = {
        adminId: this._id,
        username: this.username,
    };
    const token = jsonwebtoken_1.default.sign(payload, app_config_1.default.jwt.secret, {
        expiresIn: app_config_1.default.jwt.expiresIn,
    });
    return token;
};
exports.MAdmin = (0, mongoose_1.model)("Admin", AdminSchema);
