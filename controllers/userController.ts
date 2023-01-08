import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(req.headers);

  if (!userId || userId === "null") {
    console.log("no userid!");
    return res
      .status(422)
      .json({ error: true, message: "Unprocessable entityt" });
  }

  const foundUser = await User.findById(userId).select("-password");

  if (!foundUser) {
    return res.status(404).json({ message: "User not found." });
  }

  res.json({ success: true, data: foundUser });
};

const register = async (req: Request, res: Response) => {
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
    courses: [],
  });

  await newUser.save();

  res.status(201).json({ success: true, message: "new user created!" });
};

export { getUserById, register };
