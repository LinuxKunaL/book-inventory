"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = __importDefault(require("../controllers/quiz.controller"));
const router = (0, express_1.Router)();
router.get("/", quiz_controller_1.default.getQuizzes);
router.get("/:id", quiz_controller_1.default.getQuizById);
router.post("/", quiz_controller_1.default.createQuiz);
router.put("/", quiz_controller_1.default.updateQuiz);
router.delete("/:id", quiz_controller_1.default.deleteQuiz);
router.get("/:id/participants", quiz_controller_1.default.getParticipants);
exports.default = router;
