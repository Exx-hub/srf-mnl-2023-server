import { Request, Response } from "express";

const getCourses = (req: Request, res: Response) => {
  res.send("all courses!");
};

export { getCourses };
