import { Router } from "express";
import controller from "../controllers/other.controller";

const router = Router();

router.get("/", controller.getOverviewData);
router.get("/achievements", controller.getAchievements);

export default router;
