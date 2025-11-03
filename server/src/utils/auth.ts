import type { UserType } from "../@types";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const jwtSecret = process.env.JWT_SECRET_KEY as string;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN as string;

export const generateAuthToken = (user: UserType) => {
  if (!jwtSecret || !jwtExpiresIn) {
    throw new Error("Jwt secret or expiration time is not defined!");
  }
  const token = jwt.sign(
    { userId: user._id, email: user.email, iat: Math.floor(Date.now()) / 1000 },
    jwtSecret,
    { expiresIn: `${Number(jwtExpiresIn)}m`, algorithm: "HS256" }
  );
  return token;
};

export const sendAuthCookie = (res: Response, token: string) => {
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: Number(jwtExpiresIn) * 60 * 1000, // Convert minutes to milliseconds
  });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
};
