import express from "express";
import { validateSchema } from "../middlewares/validateSchema";
import {
  registerUserSchema,
  loginUserSchema,
  updateUserProfileSchema,
  updateUserPasswordSchema,
} from "../schemas/authSchema";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAuthUser,
  updateUserProfile,
  updateUserPassword,
} from "../controllers/authController";
import { authenticateUser } from "../middlewares/authenticateUser";

const authRouter = express.Router();

authRouter.post("/register", validateSchema(registerUserSchema), registerUser);

authRouter.post("/login", validateSchema(loginUserSchema), loginUser);

authRouter.use(authenticateUser);

authRouter.get("/me", getAuthUser);

authRouter.post("/logout", logoutUser);

authRouter.patch(
  "/update-profile",
  validateSchema(updateUserProfileSchema),
  updateUserProfile
);

authRouter.patch(
  "/update-password",
  validateSchema(updateUserPasswordSchema),
  updateUserPassword
);

export default authRouter;
