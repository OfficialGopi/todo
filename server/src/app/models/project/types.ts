import mongoose, { Document } from "mongoose";

interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
export { IProject };
