import { Request, Response } from "express";
import Course from "../models/Course";

const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, data: courses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export { getCourses };
