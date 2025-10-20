import { Router } from "express";
import QuizController from "../controllers/quiz.controller";

const router = Router();

router.get("/", QuizController.getQuizzes);
router.get("/attempts", QuizController.getAttemptQuizzes);
router.get("/attempt/:id", QuizController.attemptQuiz);
router.post("/submit", QuizController.submitQuiz);
router.get("/result/:id", QuizController.getQuizResult);

export default router;
