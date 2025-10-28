"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesFieldsValidator = void 0;
const zod_1 = require("zod");
const CoursesZodSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    category: zod_1.z.string(),
    duration: zod_1.z.string(),
    difficulty: zod_1.z.string(),
    visibility: zod_1.z.enum(["public", "private"]),
    thumbnail: zod_1.z.string(),
    lessons: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        title: zod_1.z.string(),
        description: zod_1.z.string(),
        video: zod_1.z.object({
            name: zod_1.z.string(),
            duration: zod_1.z.string(),
        }),
        resources: zod_1.z
            .array(zod_1.z.object({
            name: zod_1.z.string(),
            size: zod_1.z.string(),
        }))
            .optional(),
    })),
    lessonsLength: zod_1.z.string(),
    studentEnrolled: zod_1.z.number().optional(),
    deletedFiles: zod_1.z
        .object({
        video: zod_1.z.array(zod_1.z.string()).optional(),
        resources: zod_1.z.array(zod_1.z.string()).optional(),
        thumbnail: zod_1.z.string().optional(),
    })
        .optional(),
});
exports.coursesFieldsValidator = CoursesZodSchema;
