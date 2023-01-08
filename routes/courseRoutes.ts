import { Router } from "express";
import { getCourses } from "../controllers/courseController";

const router = Router();

router.get("/courses", getCourses);

export default router;
