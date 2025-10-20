import { Router } from "express";
import StudentCourseController from "../controllers/course.controller";

const router = Router();

router.get("/enrolled", StudentCourseController.getEnrolledCourses);
router.get("/", StudentCourseController.getCourses);
router.get("/:id", StudentCourseController.getCourseById);
router.post("/enroll", StudentCourseController.courseEnrollment);
router.put("/progress", StudentCourseController.updateProgress);

export default router;
