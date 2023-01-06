import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
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

  res
    .status(200)
    .json({ success: true, message: "Login sucess", token: "token" });
};

export { register, login };
