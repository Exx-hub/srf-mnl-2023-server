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
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(401)
            .json({ success: false, message: "All fields are required to proceed." });
    }
    const userExist = yield User_1.default.findOne({ email });
    if (!userExist) {
        return res
            .status(401)
            .json({ success: false, message: "Username not found." });
    }
    const verifiedPassword = yield bcrypt_1.default.compare(password, userExist.password);
    if (!verifiedPassword) {
        return res
            .status(401)
            .json({ success: false, message: "Incorrect password." });
    }
    const accessToken = jsonwebtoken_1.default.sign({ userEmail: userExist.email, userId: userExist._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
    // wag muna natin lagyan ng refresh. access token lang muna, like eds?
    //   const refreshToken = jwt.sign(
    //     { userEmail: userExist.email },
    //     process.env.REFRESH_TOKEN_SECRET!,
    //     { expiresIn: "7d" }
    //   );
    res.json({
        success: true,
        message: "Login sucess",
        userId: userExist._id,
        accessToken,
    });
});
exports.login = login;
//# sourceMappingURL=authController.js.map