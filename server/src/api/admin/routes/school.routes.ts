import { Router } from "express";
import AdminSchoolController from "../controllers/school.controller";

const router = Router();

router.get("/", AdminSchoolController.getSchools);

export default router;
