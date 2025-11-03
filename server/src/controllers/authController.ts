import { Request, Response } from "express";
import User from "../models/userModel";
import logger from "../utils/logger";
import {
  generateAuthToken,
  sendAuthCookie,
  clearAuthCookie,
} from "../utils/auth";
import { UserType } from "../@types";

const serverErrMsg = "Internal server error";

export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Conflict: User already exists!" });
    }
    const newUser = await User.create({ username, email, password });
    const token = generateAuthToken(newUser as unknown as UserType);
    sendAuthCookie(res, token);

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
    return res
      .status(201)
      .json({ user: userResponse, message: "User registered successfully" });
  } catch (err) {
    logger.error(`Error registering user: ${err}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const errMsg = "Invalid email or password";
  if (!email || !password) {
    return res.status(400).json({ message: errMsg });
  }
  try {
    const user = (await User.findOne({ email })
      .select("+password")
      .exec()) as unknown as UserType;
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: errMsg });
    }
    const token = generateAuthToken(user);
    sendAuthCookie(res, token);
    return res.status(200).json({ message: "Logged in successfully", user });
  } catch (err) {
    logger.error(`Error logging in user: ${err}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    clearAuthCookie(res);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    logger.error(`Error logging out user: ${err}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const getAuthUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    logger.error(`Error getting auth user: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: " Unauthorized!" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).exec();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    logger.error(`Error updating user profile: ${err as string}`);
    return res.status(500).json({ message: serverErrMsg });
  }
};

export async function updateUserPassword(req: Request, res: Response) {
  try {
    const user = req.user as UserType;
    if (!user || !(await user.comparePassword(req.body.oldPassword))) {
      return res
        .status(400)
        .json({ message: "Unauthorized. Invalid old password" });
    }
    try {
      user.password = req.body.newPassword;
      await user.save();
      clearAuthCookie(res);
      return res.status(200).json({
        message:
          "Password updated successfully. Please login with new password",
      });
    } catch (err) {
      logger.error(`Error updating password: ${err}`);
      return res.status(400).json({ message: "Error updating password" });
    }
  } catch (err) {
    logger.error(`Error in update password: ${err}`);
    return res.status(500).json({ message: serverErrMsg });
  }
}
