import z from "zod";

export const registerUserSchema = z.object({
  body: z
    .object({
      username: z.string().min(3).max(50).nonempty("User name is required"),
      email: z
        .string()
        .email({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
        .nonempty("Email is required"),
      password: z.string().min(8).max(50).nonempty("Password is required"),
      confirmPassword: z
        .string()
        .min(8)
        .max(50)
        .nonempty("Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
      .nonempty("Email is required"),
    password: z.string().min(8).max(50).nonempty("Password is required"),
  }),
});

export const updateUserProfileSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(50).optional(),
    email: z
      .string()
      .email({ pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })
      .optional(),
    businessName: z.string().max(50).optional(),
    address: z.string().max(200).optional(),
    phoneNumber: z.string().max(20).optional(),
  }),
});

export const updateUserPasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z
        .string()
        .min(8)
        .max(50)
        .nonempty("Old Password is required"),
      newPassword: z.string().min(8).max(50).nonempty("Password is required"),
      confirmPassword: z
        .string()
        .min(8)
        .max(50)
        .nonempty("Confirm Password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});
