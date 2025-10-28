"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEnrolledCourses = void 0;
const mongoose_1 = require("mongoose");
const EnrolledCoursesSchema = new mongoose_1.Schema({
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "Students" },
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: "Courses" },
    isCompleted: { type: Boolean, default: false },
    progress: { type: Number, default: 0 },
    currentLesson: { type: String, default: "" },
    currentLessonTitle: { type: String, default: "" },
    completedLessons: { type: [String], default: [] },
    currentVideoTime: { type: Number, default: 0 },
}, {
    timestamps: true,
});
exports.MEnrolledCourses = (0, mongoose_1.model)("enrolledCourses", EnrolledCoursesSchema);
