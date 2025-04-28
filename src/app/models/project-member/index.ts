import mongoose from "mongoose";
import {
  USER_ROLES,
  USER_ROLES_ENUM,
} from "../../constants/enums.constants.js";
import { IProjectMember } from "./types.js";

const projectMemberSchema = new mongoose.Schema<IProjectMember>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    role: {
      type: String,
      enum: USER_ROLES_ENUM,
      default: USER_ROLES.MEMBER,
    },
  },
  {
    timestamps: true,
  },
);

// projectMemberSchema.post("deleteOne", async function (next) {});

const ProjectMemberModel = mongoose.model<IProjectMember>(
  "projectmembers",
  projectMemberSchema,
);

export { ProjectMemberModel };
