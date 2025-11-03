import { Request, Response, NextFunction } from "express";
import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} from "jsonwebtoken";
import { jwtSecret } from "../utils/auth";
import User from "../models/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: { _id: string };
    }
  }
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization?.split(" ")[1] ?? req.cookies.authToken;
  const errMsg = "You are not logged in!";
  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: errMsg });
  }
  try {
    const verified = jwt.verify(token, jwtSecret);
    if (typeof verified !== "object" || !("userId" in verified)) {
      return res.status(401).json({ message: errMsg });
    }
    const user = await User.findById(verified.userId).select("+password");
    if (!user) {
      return res.status(401).json({ message: errMsg });
    }
    req.user = user as { _id: string };
    res.locals.user = user;
    next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Your token has expired!" });
    }
    if (err instanceof NotBeforeError) {
      return res.status(401).json({ message: "Your token is not active yet!" });
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: errMsg });
    }
  }
};
