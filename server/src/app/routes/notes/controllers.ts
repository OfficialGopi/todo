import { USER_ROLES } from "../../constants/enums.constants";
import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { NoteModel } from "../../models/note";
import { ProjectMemberModel } from "../../models/project-member";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class NotesControllers {
  public getNotes = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    
    const { _id } = req.user;
    const { projectId } = req.params;

    // Check if user is project member
    const userRole = await ProjectMemberModel.findOne({
      project: projectId,
      user: _id,
    });

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const notes = await NoteModel.find({
      project: projectId,
    }).populate("createdBy", "name username avatar");

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, notes, "Notes found successfully"));
  });

  public createNote = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { projectId } = req.params;
    const { content } = req.body;
    const { _id } = req.user;
    const note = await NoteModel.create({
      project: projectId,
      content,
      createdBy: _id,
    });

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          note,
          "Note created successfully",
        ),
      );
  });

  public getNoteById = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    
    const { _id } = req.user;
    const { noteId, projectId } = req.params;
    
    const note = await NoteModel.findById(noteId);
    if (!note) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Note not found");
    }

    // Check if user is project member
    const userRole = await ProjectMemberModel.findOne({
      project: projectId,
      user: _id,
    });

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const populatedNote = await NoteModel.findById(noteId).populate("createdBy", "name username avatar");
    
    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, populatedNote, "Note found successfully"));
  });

  public updateNote = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { noteId } = req.params;
    const { content } = req.body;
    const { projectId } = req.params;

    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Note not found");
    }

    if (!content) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Content is required");
    }

    const userRole = await ProjectMemberModel.findOne({
      project: projectId,
      user: _id,
    });

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole.role === USER_ROLES.MEMBER) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (
      userRole.role === USER_ROLES.PROJECT_ADMIN &&
      note.createdBy.toString() !== _id.toString()
    ) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    note.content = content;
    await note.save();

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Note updated successfully"));
  });

  public deleteNote = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { projectId, noteId } = req.params;

    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Note not found");
    }

    const userRole = await ProjectMemberModel.findOne({
      project: projectId,
      user: _id,
    });

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole.role === USER_ROLES.MEMBER) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (
      userRole.role === USER_ROLES.PROJECT_ADMIN &&
      note.createdBy.toString() !== _id.toString()
    ) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    await NoteModel.deleteOne({
      _id: noteId,
      project: projectId,
    });

    return res
      .status(STATUS_CODE.DELETED_SUCCESSFULLY)
      .json(
        new ApiResponse(
          STATUS_CODE.DELETED_SUCCESSFULLY,
          {},
          "Note deleted successfully",
        ),
      );
  });
}

export { NotesControllers };
