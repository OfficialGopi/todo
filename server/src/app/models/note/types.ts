import mongoose, { Document } from "mongoose";

interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  content: string;

  createdAt: Date;
  updatedAt: Date;
}

export type { INote };
