import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userEmail: string;
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;
  const token = authHeader?.split(" ")[1];

  // console.log(req.headers);
  // console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Jwt required.", message: "Forbidden." });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload;

    req.user = decoded.userEmail;
    next();
  } catch (err: any) {
    console.log(err.message);
    return res.status(401).json({ error: err.message, message: "Forbidden." });
  }
};

export default verifyJWT;

// setup rtk and rtk query for data fetching and saving global state.
// tasks => basic user profile in FE, fetch user data with token from database.

// try to protect profile route or restrict profile route
// start with small features.
