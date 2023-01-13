"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    isActive: { type: Boolean, default: true },
    createdOn: { type: Date, default: new Date() },
});
exports.default = mongoose_1.default.model("Course", courseSchema);
//# sourceMappingURL=Course.js.map