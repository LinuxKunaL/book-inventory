"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizzesFieldsValidator = exports.quizzesSchema = void 0;
const zod_1 = require("zod");
const questionSchema = zod_1.z.object({
    id: zod_1.z.string(),
    question: zod_1.z.string(),
    options: zod_1.z.array(zod_1.z.string()),
    correctAnswer: zod_1.z.string(),
    explanation: zod_1.z.string().optional(),
});
exports.quizzesSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    visibility: zod_1.z.string(),
    timeLimit: zod_1.z.number(),
    passingScore: zod_1.z.number(),
    difficulty: zod_1.z.string(),
    assignedGroups: zod_1.z.array(zod_1.z.string()),
    questions: zod_1.z.array(questionSchema),
    questionsLength: zod_1.z.number().optional(),
});
exports.quizzesFieldsValidator = exports.quizzesSchema;
