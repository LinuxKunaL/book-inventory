import { Router } from "express";
import quizRoutes from "./routes/quiz.routes";
import courseRoutes from "./routes/course.routes";
import otherRoutes from "./routes/other.routes";
import notificationRoutes from "./routes/notification.routes";

const router = Router();

router.use("/courses", courseRoutes);
router.use("/quizzes", quizRoutes);
router.use("/notifications", notificationRoutes);
router.use("/overview", otherRoutes);

export default router;
