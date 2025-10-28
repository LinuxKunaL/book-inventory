"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentFieldsValidator = void 0;
const zod_1 = require("zod");
const StudentZodSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    school: zod_1.z.string(),
    admissionNumber: zod_1.z.string(),
    studentName: zod_1.z.string(),
    dateOfBirth: zod_1.z.string(),
    gender: zod_1.z.string(),
    classStandard: zod_1.z.string(),
    section: zod_1.z.string(),
    parentName: zod_1.z.string(),
    address: zod_1.z.object({
        state: zod_1.z.string(),
        city: zod_1.z.string(),
        street: zod_1.z.string(),
        pinCode: zod_1.z.string(),
    }),
});
exports.studentFieldsValidator = StudentZodSchema;
