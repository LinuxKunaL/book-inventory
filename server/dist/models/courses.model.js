"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MCourses = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    difficulty: { type: String, required: true },
    visibility: { type: String, required: true, enum: ["public", "private"] },
    thumbnail: { type: String, required: true },
    lessons: {
        type: [
            {
                _id: false,
                title: { type: String, required: true },
                description: { type: String, required: true },
                id: { type: String, required: true },
                video: {
                    name: { type: String, required: true },
                    duration: { type: String, required: true },
                },
                resources: {
                    type: [
                        { _id: false, name: { type: String }, size: { type: String } },
                    ],
                },
            },
        ],
        required: true,
    },
    lessonsLength: { type: String, required: true },
    studentEnrolled: { type: Number, default: 0 },
});
exports.MCourses = (0, mongoose_2.model)("Courses", CourseSchema);
