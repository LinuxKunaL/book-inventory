import { Router } from "express";
import controller from "../controllers/notifications.controller";

const router = Router();

router.get("/", controller.getNotifications);

export default router;
