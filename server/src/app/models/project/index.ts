import mongoose from "mongoose";
import { ProjectMemberModel } from "../project-member/index";
import { USER_ROLES } from "../../constants/enums.constants.js";
import { TaskModel } from "../task";
import { SubTaskModel } from "../subtask";

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
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

ProjectSchema.pre("save", async function (next) {
  if (this.isNew) {
    await ProjectMemberModel.create({
      project: this._id,
      user: this.createdBy,
      role: USER_ROLES.ADMIN,
    });
  }

  return next();
});

ProjectSchema.pre("deleteOne", async function (next) {
  await ProjectMemberModel.deleteMany({
    project: this.getQuery()._id,
  });

  await TaskModel.deleteMany({
    project: this.getQuery()._id,
  });

  const tasks = await TaskModel.distinct("_id", {
    project: this.getQuery()._id,
  });

  for (const task of tasks) {
    await SubTaskModel.deleteOne({
      task: task,
    });
  }

  next();
});

const ProjectModel = mongoose.model("projects", ProjectSchema);

export { ProjectModel };
