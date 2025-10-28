"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MStudent = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importStar(require("mongoose"));
const app_config_1 = __importDefault(require("../config/app.config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const studentSchema = new mongoose_1.default.Schema({
    studentName: { type: String, required: true },
    mobileNumber: { type: String },
    email: { type: String },
    admissionNumber: { type: String, required: true, unique: true },
    password: { type: String },
    dateOfBirth: { type: String, required: true },
    school: { type: mongoose_1.Schema.Types.ObjectId, ref: "Schools" },
    classStandard: { type: String, required: true },
    section: { type: String, required: true },
    gender: { type: String, required: true },
    parentName: { type: String, required: true },
    address: {
        state: { type: String, required: true },
        city: { type: String, required: true },
        street: { type: String, required: true },
        pinCode: { type: String, required: true },
    },
    isRegistered: { type: Boolean, default: false },
    notificationCount: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastStreakUpdate: { type: Date, default: null },
}, {
    timestamps: true,
});
studentSchema.methods.generateToken = function () {
    const payload = {
        studentId: this._id.toString(),
        studentName: this.studentName,
    };
    const token = jsonwebtoken_1.default.sign(payload, app_config_1.default.jwt.secret, {
        expiresIn: app_config_1.default.jwt.expiresIn,
    });
    return token;
};
studentSchema.methods.comparePassword = function (password) {
    return bcryptjs_1.default.compareSync(password, this.password);
};
exports.MStudent = mongoose_1.default.model("Student", studentSchema);
