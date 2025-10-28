"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const deleteFiles_middleware_1 = require("../../../middleware/deleteFiles.middleware");
const other_service_1 = __importDefault(require("../services/other.service"));
const router = (0, express_1.Router)();
router.get("/", course_controller_1.default.getCourses);
router.get("/:id", course_controller_1.default.getCourseById);
router.post("/", other_service_1.default.storage.any(), course_controller_1.default.createCourse);
router.put("/", other_service_1.default.storage.any(), deleteFiles_middleware_1.deleteFiles, course_controller_1.default.updateCourse);
router.delete("/:id", course_controller_1.default.deleteCourse);
exports.default = router;
