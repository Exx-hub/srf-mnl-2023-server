import { Request, Response } from "express";
import Course from "../models/Course";

const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.find();

  console.log(courses);
};

export { getCourses };
