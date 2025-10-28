"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = __importDefault(require("../controllers/quiz.controller"));
const router = (0, express_1.Router)();
router.get("/", quiz_controller_1.default.getQuizzes);
router.get("/attempts", quiz_controller_1.default.getAttemptQuizzes);
router.get("/attempt/:id", quiz_controller_1.default.attemptQuiz);
router.post("/submit", quiz_controller_1.default.submitQuiz);
router.get("/result/:id", quiz_controller_1.default.getQuizResult);
exports.default = router;
