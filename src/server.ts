import express, { Request, Response, Express } from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "../routes/authRoutes";
import userRoutes from "../routes/userRoutes";
import courseRoutes from "../routes/courseRoutes";
import connectDB from "../config/connectDB";
import corsOptions from "../config/corsOptions";
import verifyJWT from "../middleware/verifyJWT";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use(authRoutes);
app.use(userRoutes);
app.use(courseRoutes);

// add catch all error route here

const db = mongoose.connection;

db.once("open", () => {
  console.log(process.env.NODE_ENV);
  console.log("DB connection Established");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

db.on("error", (err) => {
  console.log("connection error");
  console.log(err);
});
