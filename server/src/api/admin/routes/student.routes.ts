import { Router } from "express";
import controller from "../controllers/student.controller";

const router = Router();

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.post("/", controller.createStudent);
router.put("/", controller.updateStudent);

export default router;
