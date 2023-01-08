import { Router } from "express";

import { getUserById, register } from "../controllers/userController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();

router.post("/register", register);
router.get("/profile/:userId", verifyJWT, getUserById);

export default router;
