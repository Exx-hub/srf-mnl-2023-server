"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    courses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});
exports.default = mongoose_1.default.model("User", userSchema);
// courses: [
//   {
//     courseId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },
//     enrolledOn: { type: Date, default: new Date() },
//     status: { type: String, default: "active" },
//   },
// ],
//# sourceMappingURL=User.js.map