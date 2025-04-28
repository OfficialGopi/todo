import mongoose, { Document } from "mongoose";

interface IProjectMember extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export { IProjectMember };
