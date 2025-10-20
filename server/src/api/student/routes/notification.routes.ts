import { Router } from "express";
import notificationsController from "../controllers/notifications.controller";

const router = Router();

router.get("/", notificationsController.getNotifications);

export default router;
