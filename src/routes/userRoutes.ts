import { Router } from "express";

import {
  enrollCourse,
  getUserById,
  register,
} from "../controllers/userController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post("/register", register);
router.get("/profile/:userId", verifyJWT, getUserById);
router.post("/enroll", verifyJWT, enrollCourse);

export default router;
