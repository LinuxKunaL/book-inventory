"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const router = (0, express_1.Router)();
router.get("/", student_controller_1.default.getStudents);
router.get("/:id", student_controller_1.default.getStudentById);
router.post("/", student_controller_1.default.createStudent);
router.put("/", student_controller_1.default.updateStudent);
exports.default = router;
