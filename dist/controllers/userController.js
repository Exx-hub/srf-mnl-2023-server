"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollCourse = exports.register = exports.getUserById = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Course_1 = __importDefault(require("../models/Course"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!userId || userId === "null") {
        return res
            .status(422)
            .json({ error: true, message: "Unprocessable entity" });
    }
    const foundUser = yield User_1.default.findById(userId)
        .select("-password")
        .populate("courses", "title"); // transforms saved courseIds into course object but show title only
    if (!foundUser) {
        return res.status(404).json({ message: "User not found." });
    }
    res.json({ success: true, data: foundUser });
});
exports.getUserById = getUserById;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, mobile, email, password, confirmPassword } = req.body;
    if (!firstname ||
        !lastname ||
        !mobile ||
        !email ||
        !password ||
        !confirmPassword) {
        return res
            .status(401)
            .json({ error: true, message: "All fields are required to proceed." });
    }
    const userExist = yield User_1.default.findOne({ email });
    if (userExist) {
        return res.status(403).json({
            error: true,
            message: "Username already registered, please try a different one.",
        });
    }
    // password match validation
    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) {
        return res
            .status(401)
            .json({ success: false, message: "Passwords invalid." });
    }
    const hashedPassword = yield bcrypt_1.default.hash("123123", 10);
    const newUser = new User_1.default({
        firstname,
        lastname,
        mobile,
        email,
        password: hashedPassword,
        courses: [],
    });
    yield newUser.save();
    res.status(201).json({ success: true, message: "new user created!" });
});
exports.register = register;
const enrollCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseId = req.body.courseId;
    const userId = req.user.userId;
    try {
        const userEnrollee = yield User_1.default.findById(userId);
        if (!userEnrollee) {
            return res.status(404).json({ message: "User not found" });
        }
        const courseToEnroll = yield Course_1.default.findById(courseId);
        if (!courseToEnroll) {
            return res.status(404).json({ message: "Course not found" });
        }
        const duplicateCourse = userEnrollee.courses.includes(courseToEnroll._id);
        if (duplicateCourse) {
            return res.status(400).json({ message: "Course already enrolled." });
        }
        userEnrollee === null || userEnrollee === void 0 ? void 0 : userEnrollee.courses.push(courseToEnroll._id);
        yield (userEnrollee === null || userEnrollee === void 0 ? void 0 : userEnrollee.save());
        res.json({ success: true, message: "add course success" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.enrollCourse = enrollCourse;
//# sourceMappingURL=userController.js.map