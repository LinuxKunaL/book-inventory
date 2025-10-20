import { Router } from "express";
import AdminQuizController from "../controllers/quiz.controller";

const router = Router();

router.get("/", AdminQuizController.getQuizzes);
router.get("/:id", AdminQuizController.getQuizById);
router.post("/", AdminQuizController.createQuiz);
router.put("/", AdminQuizController.updateQuiz);
router.delete("/:id", AdminQuizController.deleteQuiz);

router.get("/:id/participants", AdminQuizController.getParticipants);

export default router;
