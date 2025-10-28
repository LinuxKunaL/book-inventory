"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const stats_service_1 = __importDefault(require("./stats.service"));
const activity_service_1 = require("./activity.service");
const courses_model_1 = require("../../../models/courses.model");
const AppError_1 = require("../../../utils/Error/AppError");
const studentStats_model_1 = require("../../../models/studentStats.model");
const enrolledCourses_model_1 = require("../../../models/enrolledCourses.model");
const getCourses = async (query) => {
    const page = query.page || 1;
    const search = query.search || "";
    const difficulty = query.difficulty || "";
    const category = query.category || "";
    const queryFIlter = {
        $and: [
            {
                title: { $regex: search, $options: "i" },
                category: { $regex: category, $options: "i" },
                difficulty: { $regex: difficulty, $options: "i" },
                visibility: "public",
            },
        ],
    };
    try {
        const result = await courses_model_1.MCourses.find(queryFIlter)
            .select("-__v -lessons")
            .skip((page - 1) * 10)
            .limit(10);
        const totalCourses = await courses_model_1.MCourses.countDocuments(queryFIlter);
        return {
            courses: result,
            totalCourses,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getCourseById = async (studentId, courseId) => {
    try {
        const result = await enrolledCourses_model_1.MEnrolledCourses.findOne({
            student: studentId,
            course: courseId,
        })
            .select("-__v -student")
            .populate({
            path: "course",
            select: "-__v -studentEnrolled",
        });
        const filteredResult = result?.course.visibility === "public" ? result : null;
        return filteredResult;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getEnrolledCourses = async (studentId) => {
    try {
        const result = await enrolledCourses_model_1.MEnrolledCourses.find({ student: studentId })
            .select("-__v -student")
            .populate({
            path: "course",
            match: { visibility: "public" },
            select: "-__v -lessons",
        });
        const stats = await studentStats_model_1.MStudentStats.findOne({
            student: studentId,
        }).select("courses");
        return {
            courses: result,
            stats: stats.courses,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const courseEnrollment = async (courseId, userId) => {
    try {
        const enrollExists = await enrolledCourses_model_1.MEnrolledCourses.findOne({
            course: courseId,
            student: userId,
        });
        if (enrollExists) {
            throw new AppError_1.AppError("You have already enrolled in this course", http_status_codes_1.default.BAD_REQUEST);
        }
        await enrolledCourses_model_1.MEnrolledCourses.create({
            course: courseId,
            student: userId,
        });
        const { title } = await courses_model_1.MCourses.findByIdAndUpdate(courseId, {
            $inc: {
                studentEnrolled: 1,
            },
        }, {
            new: true,
        }).select("title");
        (0, activity_service_1.pushActivity)(userId, "Course", `Started '${title}' Course`, "green");
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
};
const updateProgress = async (userId, data) => {
    try {
        const totalLessons = Number(data.lessonsLength);
        const completedLessons = data.completedLessons.length;
        const progress = Math.floor((completedLessons / totalLessons) * 100);
        const { course } = await enrolledCourses_model_1.MEnrolledCourses.findOneAndUpdate({
            student: userId,
            course: data.courseId,
        }, {
            $addToSet: {
                completedLessons: { $each: data.completedLessons },
            },
            $set: {
                isCompleted: data.courseCompleted,
                currentLesson: data.currentLesson,
                currentVideoTime: data.currentVideoTime,
                currentLessonTitle: data.currentLessonTitle,
                progress,
            },
        }, {
            new: true,
        }).populate({
            path: "course",
            select: "title",
        });
        if (data.courseCompleted) {
            (0, activity_service_1.pushActivity)(userId, "Course", `Finished '${course.title}' Course`, "violet");
        }
        stats_service_1.default.updateCourseTotalHours(userId, data.currentVideoTime);
        stats_service_1.default.updateCompletedCourses(userId);
        stats_service_1.default.updateOverallProgress(userId);
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message, http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    courseEnrollment,
    getEnrolledCourses,
    getCourseById,
    updateProgress,
    getCourses,
};
