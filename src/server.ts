import express, { Request, Response, Express } from "express";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "../routes/authRoutes";
import connectDB from "../config/connectDB";

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(authRoutes);

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
