import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "./../../../env";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// IMPORT TYPE USER
import type { IUser } from "./types";

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true,
  },

  username: {
    type: String,
    unique: [true, "Username is not available"],
    require: [true, "Username is required"],
  },
  avatar: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: `https://via.placeholder.com/200x200.png`,
      localPath: "",
    },
  },
  email: {
    type: String,
    unique: [true, "This Email is already registered"],
    require: true,
  },

  password: {
    type: String,
    require: true,
  },

  isEmailVerified: {
    type: Boolean,
    default: false,
  },

  refreshToken: {
    type: String,
  },

  forgotPasswordToken: {
    type: String,
  },

  forgotPasswordExpiry: {
    type: Date,
  },

  emailVerificationToken: {
    type: String,
  },

  emailVerificationExpiry: {
    type: Date,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: env.ACCESS_TOKEN_EXPIRY,
    } as jwt.SignOptions,
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: env.REFRESH_TOKEN_EXPIRY,
    } as jwt.SignOptions,
  );
};

UserSchema.methods.generateEmailVerificationToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + 20 * 60 * 1000; // 20 minutes;

  return { unHashedToken, hashedToken, tokenExpiry };
};

UserSchema.methods.generateHashOfToken = function (token: string) {
  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return hashedToken;
};

const UserModel = mongoose.model<IUser>("users", UserSchema);

export { UserModel };
