import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, mobile, email, password, confirmPassword } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !mobile ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res
      .status(401)
      .json({ error: true, message: "All fields are required to proceed." });
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.status(401).json({
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

  const hashedPassword = await bcrypt.hash("123123", 10);

  const newUser = new User({
    firstname,
    lastname,
    mobile,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ success: true, message: "new user created!" });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ error: true, message: "All fields are required to proceed." });
  }

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res
      .status(401)
      .json({ error: true, message: "Username not found." });
  }

  const verifiedPassword = await bcrypt.compare(password, userExist.password);

  if (!verifiedPassword) {
    return res
      .status(401)
      .json({ error: true, message: "Incorrect password." });
  }

  const accessToken = jwt.sign(
    { userEmail: userExist.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "5m" }
  );

  // wag muna natin lagyan ng refresh. access token lang muna, like eds?
  //   const refreshToken = jwt.sign(
  //     { userEmail: userExist.email },
  //     process.env.REFRESH_TOKEN_SECRET!,
  //     { expiresIn: "7d" }
  //   );

  res.json({ success: true, message: "Login sucess", accessToken });
};

// const refresh = (req,res,next) => {}

export { register, login };
