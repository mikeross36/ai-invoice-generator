"use server";

import { ERoutes } from "@/@types";
import { axiosPrivate } from "@/services/axiosPrivate";
import toast from "react-hot-toast";

const API_ENDPOINTS = {
  REGISTER_USER: "/auth/register",
  LOGIN_USER: "/auth/login",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerUser = async (prevState: unknown, formData: FormData) => {
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!username || !email || !password || !confirmPassword) {
      return {
        success: false,
        error: "All fields are required",
        toast: toast.error("All fields are required"),
      };
    }
    if (username.length < 3) {
      return {
        success: false,
        error: "Username must be at least 3 characters long",
        toast: toast.error("Username must be at least 3 characters long"),
      };
    }
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address!",
        toast: toast.error("Please enter a valid email address!"),
      };
    }
    if (password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
        toast: toast.error("Password must be at least 6 characters long"),
      };
    }
    if (password !== confirmPassword) {
      return {
        success: false,
        error: "Passwords do not match!",
        toast: toast.error("Passwords do not match!"),
      };
    }
    const response = await axiosPrivate.post(API_ENDPOINTS.REGISTER_USER, {
      username,
      email,
      password,
      confirmPassword,
    });

    if (!response.data) {
      return {
        success: false,
        error: "Invalid response from server",
        toast: toast.error("Invalid response from server"),
      };
    }
    setTimeout(() => {
      window.location.href = ERoutes.DASHBOARD;
    }, 1500);
    return {
      success: true,
      data: response.data,
      toast: toast.success("Registration successful"),
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: `Failed to register user: ${err.message}`,
        toast: toast.error(`Failed to register user:  ${err.message}`),
      };
    }
  }
};

export const loginUser = async (prevState: unknown, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      return {
        success: false,
        error: "Missing or invalid email or password",
        toast: toast.error("Missing or invalid email or password"),
      };
    }
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address!",
        toast: toast.error("Please enter a valid email address!"),
      };
    }
    if (password.length < 8) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
        toast: toast.error("Password must be at least 6 characters long"),
      };
    }
    const response = await axiosPrivate.post(API_ENDPOINTS.LOGIN_USER, {
      email,
      password,
    });
    if (!response.data) {
      return {
        success: false,
        error: "Invalid response from server",
        toast: toast.error("Invalid response from server"),
      };
    }
    setTimeout(() => {
      window.location.href = ERoutes.DASHBOARD;
    }, 1500);
    return {
      success: true,
      data: response.data,
      toast: toast.success("Login successful", {
        position: "bottom-center",
      }),
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        error: `Failed to login user: ${err.message}`,
        toast: toast.error(`Failed to login user: ${err.message}`),
      };
    }
  }
};
