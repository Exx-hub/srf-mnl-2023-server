import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All fields are required to proceed." });
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res
      .status(401)
      .json({ success: false, message: "Username not found." });
  }

  const verifiedPassword = await bcrypt.compare(password, userExist.password);

  if (!verifiedPassword) {
    return res
      .status(401)
      .json({ success: false, message: "Incorrect password." });
  }

  const accessToken = jwt.sign(
    { userEmail: userExist.email, userId: userExist._id },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "30m" }
  );

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
};

// const refresh = (req,res,next) => {}

export { login };
