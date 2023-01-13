"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const verifyJWT_1 = __importDefault(require("../middleware/verifyJWT"));
const router = (0, express_1.Router)();
router.post("/register", userController_1.register);
router.get("/profile/:userId", verifyJWT_1.default, userController_1.getUserById);
router.post("/enroll", verifyJWT_1.default, userController_1.enrollCourse);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map