import mongoose, { Document } from "mongoose";

interface ISubTask extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  task: mongoose.Types.ObjectId;
  isCompleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export { ISubTask };
