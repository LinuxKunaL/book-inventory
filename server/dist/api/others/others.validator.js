"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schoolFieldsValidator = void 0;
const zod_1 = require("zod");
const SchoolZodSchema = zod_1.z.object({
    schoolName: zod_1.z.string(),
    contactPersonDetails: zod_1.z.string(),
    schoolLocation: zod_1.z.string(),
    boardOfEducation: zod_1.z.string(),
    mailId: zod_1.z.string(),
    coordinatorName: zod_1.z.string(),
    coordinatorContact: zod_1.z.string(),
});
exports.schoolFieldsValidator = SchoolZodSchema;
