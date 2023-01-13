"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController");
const router = (0, express_1.Router)();
router.get("/courses", courseController_1.getCourses);
exports.default = router;
//# sourceMappingURL=courseRoutes.js.map