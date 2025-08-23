import mongoose from "mongoose";
import type { INote } from "./types";

const NoteSchema = new mongoose.Schema<INote>(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const NoteModel = mongoose.model<INote>("notes", NoteSchema);

export { NoteModel };
