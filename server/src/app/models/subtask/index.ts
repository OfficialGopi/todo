import mongoose from "mongoose";
import { ISubTask } from "./types";

const subtaskSchema = new mongoose.Schema<ISubTask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SubTaskModel = mongoose.model<ISubTask>("subtasks", subtaskSchema);

export { SubTaskModel };
