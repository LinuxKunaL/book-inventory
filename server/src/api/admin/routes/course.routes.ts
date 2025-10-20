import { Router } from "express";
import AdminCourseController from "../controllers/course.controller";
import { deleteFiles } from "../../../middleware/deleteFiles.middleware";
import otherService from "../services/other.service";

const router = Router();

router.get("/", AdminCourseController.getCourses);
router.get("/:id", AdminCourseController.getCourseById);
router.post(
  "/",
  otherService.storage.any(),
  AdminCourseController.createCourse
);
router.put(
  "/",
  otherService.storage.any(),
  deleteFiles,
  AdminCourseController.updateCourse
);
router.delete("/:id", AdminCourseController.deleteCourse);

export default router;
