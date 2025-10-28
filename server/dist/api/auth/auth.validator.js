"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestOtpValidator = exports.studentRegValidator = exports.adminLoginValidator = void 0;
const zod_1 = require("zod");
const adminLoginZodSchema = zod_1.z.object({
    username: zod_1.z.string(),
    gmail: zod_1.z.string(),
    password: zod_1.z.string().min(6),
});
exports.adminLoginValidator = adminLoginZodSchema;
const studentRegZodSchema = zod_1.z.object({
    admissionNumber: zod_1.z.string(),
    otp: zod_1.z.string(),
    mobileNumber: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.studentRegValidator = studentRegZodSchema;
const requestOtpZodSchema = zod_1.z.object({
    mobileNumber: zod_1.z.string().regex(/^\d{10}$/, "Invalid mobile number"),
    admissionNumber: zod_1.z.string().min(1, "Admission number is required"),
    fromProfile: zod_1.z.boolean().default(false).optional(),
});
exports.requestOtpValidator = requestOtpZodSchema;
