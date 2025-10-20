import { Router } from "express";
import controller from "../controllers/other.controller";

const router = Router();

router.get("/", controller.getOverviewData);

export default router;
