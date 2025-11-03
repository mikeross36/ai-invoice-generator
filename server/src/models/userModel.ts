import mongoose from "mongoose";
import argon2 from "argon2";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
      trim: true,
    },
    businessName: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await argon2.hash(this.password);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    if (err instanceof Error) {
      return next(err);
    }
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  if (!password) {
    throw new Error("Password is required for comparison");
  }
  try {
    const verifiedPassword = await argon2.verify(this.password, password);
    return verifiedPassword;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

const User = mongoose.model("User", userSchema);

export default User;
