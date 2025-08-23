import mongoose from "mongoose";
import {
  TASK_STATUS,
  TASK_STATUS_ENUM,
} from "../../constants/enums.constants.js";
import { ITask } from "./types.js";
import { SubTaskModel } from "../subtask/index.js";

const TaskSchema = new mongoose.Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      enum: TASK_STATUS_ENUM,
      default: TASK_STATUS.TODO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimetype: String,
          size: Number,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

TaskSchema.pre("deleteOne", async function (next) {
  await SubTaskModel.deleteMany({
    task: this.getQuery()._id,
  });
  next();
});

const TaskModel = mongoose.model<ITask>("tasks", TaskSchema);

export { TaskModel };
