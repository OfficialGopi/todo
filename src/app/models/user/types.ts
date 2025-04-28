import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  username: string;
  avatar: {
    url: string;
    localPath: string;
  };
  email: string;
  password: string;
  isEmailVerified: boolean;
  refreshToken: string | undefined | null;
  forgotPasswordToken: string | undefined | null;
  forgotPasswordExpiry: Date | undefined | null;
  emailVerificationToken: string | undefined | null;
  emailVerificationExpiry: Date | undefined | null;

  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken: () => string;
  generateHashOfToken: (token: string) => string;
  generateEmailVerificationToken: () => {
    unHashedToken: string;
    hashedToken: string;
    tokenExpiry: Date;
  };
}

export type { IUser };
