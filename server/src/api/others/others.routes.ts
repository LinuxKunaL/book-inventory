import { Router } from "express";
import OthersController from "./others.controller";

const router = Router();

router.put("/school", OthersController.registerSchool);

router.get("/uploads", OthersController.getUploads);

export default router;
