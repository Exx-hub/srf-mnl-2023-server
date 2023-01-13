"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("../routes/courseRoutes"));
const connectDB_1 = __importDefault(require("../config/connectDB"));
const corsOptions_1 = __importDefault(require("../config/corsOptions"));
(0, connectDB_1.default)();
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions_1.default));
app.use(authRoutes_1.default);
app.use(userRoutes_1.default);
app.use(courseRoutes_1.default);
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
// add catch all error route here
const db = mongoose_1.default.connection;
db.once("open", () => {
    console.log(process.env.NODE_ENV);
    console.log("DB connection Established");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
db.on("error", (err) => {
    console.log("connection error");
    console.log(err);
});
//# sourceMappingURL=server.js.map