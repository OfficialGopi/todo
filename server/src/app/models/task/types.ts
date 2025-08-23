import mongoose, { Document } from "mongoose";

interface ITask extends Document {
  _id: mongoose.Types.ObjectId;
  project: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  title: string;
  description: string;
  status: string;
  attachments: {
    url: String;
    mimetype: String;
    size: Number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export { ITask };
