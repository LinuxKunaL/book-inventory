"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_routes_1 = __importDefault(require("./routes/quiz.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const other_routes_1 = __importDefault(require("./routes/other.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const router = (0, express_1.Router)();
router.use("/courses", course_routes_1.default);
router.use("/quizzes", quiz_routes_1.default);
router.use("/notifications", notification_routes_1.default);
router.use("/overview", other_routes_1.default);
exports.default = router;
