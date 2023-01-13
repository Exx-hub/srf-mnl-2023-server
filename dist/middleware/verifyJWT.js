"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    // console.log(req.headers);
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ error: "Jwt required.", message: "Forbidden." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded; // decoded = {userEmail, userId}
        next();
    }
    catch (err) {
        console.log(err.message);
        return res.status(401).json({ error: err.message, message: "Forbidden." });
    }
};
exports.default = verifyJWT;
// setup rtk and rtk query for data fetching and saving global state.
// tasks => basic user profile in FE, fetch user data with token from database.
// try to protect profile route or restrict profile route
// start with small features.
//# sourceMappingURL=verifyJWT.js.map