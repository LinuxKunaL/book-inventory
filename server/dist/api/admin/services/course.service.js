"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const courses_model_1 = require("../../../models/courses.model");
const AppError_1 = require("../../../utils/Error/AppError");
const deleteFiles_middleware_1 = require("../../../middleware/deleteFiles.middleware");
const createCourse = (course) => {
    try {
        const result = courses_model_1.MCourses.create(course);
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
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
            },
        ],
    };
    try {
        const result = await courses_model_1.MCourses.find(queryFIlter)
            .select("-__v -lessons")
            .skip((page - 1) * 10)
            .limit(10);
        const totalCourses = await courses_model_1.MCourses.countDocuments(queryFIlter);
        const [totalCreatedCourses, totalPublicCourses, totalEnrolled] = await Promise.all([
            courses_model_1.MCourses.countDocuments(),
            courses_model_1.MCourses.countDocuments({ visibility: "public" }),
            courses_model_1.MCourses.aggregate([
                {
                    $group: {
                        _id: null,
                        studentEnrolled: { $sum: "$studentEnrolled" },
                    },
                },
            ]),
        ]);
        const stats = {
            totalCreatedCourses,
            totalPublicCourses,
            totalEnrolled: totalEnrolled[0]?.studentEnrolled || 0,
        };
        return {
            courses: result,
            totalCourses,
            stats,
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const getCourseById = (id) => {
    try {
        const result = courses_model_1.MCourses.findById(id).select("-__v -studentEnrolled");
        return result;
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const updateCourse = async (course) => {
    try {
        await courses_model_1.MCourses.updateOne({ _id: course._id }, {
            $pull: {
                "lessons.$[].resources": {
                    name: { $in: course.deletedFiles?.resources },
                },
            },
        });
        await courses_model_1.MCourses.updateOne({ _id: course._id }, {
            $set: {
                title: course.title,
                description: course.description,
                category: course.category,
                difficulty: course.difficulty,
                duration: course.duration,
                visibility: course.visibility,
                thumbnail: course.thumbnail,
                lessons: course.lessons,
            },
        });
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
const deleteCourse = async (id) => {
    try {
        const course = await courses_model_1.MCourses.findById(id);
        if (course) {
            (0, deleteFiles_middleware_1.deleteAllFiles)(course);
        }
        courses_model_1.MCourses.findByIdAndDelete(id);
        return {
            status: "success",
        };
    }
    catch (error) {
        throw new AppError_1.AppError(error.message + " - Error in Mongodb", http_status_codes_1.default.BAD_REQUEST);
    }
};
exports.default = {
    getCourseById,
    deleteCourse,
    updateCourse,
    createCourse,
    getCourses,
};
