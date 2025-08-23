import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { TaskModel } from "../../models/task";
import { ApiError } from "../../utils/api-error";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";
import { uploadOnCloudinary } from "../../utils/cloudinary- config";
import { ProjectMemberModel } from "../../models/project-member";
import { USER_ROLES, TASK_STATUS } from "../../constants/enums.constants";
import { SubTaskModel } from "../../models/subtask";

class TaskControllers {
  public getTasks = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { projectId } = req.params;

    const tasks = await TaskModel.find({
      project: projectId,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, tasks, "Tasks found successfully"));
  });

  public getTaskById = AsyncHandler(async (req, res) => {
    const { taskId, projectId } = req.params;

    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }
    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, task, "Task found successfully"));
  });

  public createTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { projectId } = req.params;
    const { title, description, assignedTo } = req.body;
    const { _id } = req.user;

    if (!title || !description || !assignedTo) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Missing required fields");
    }

    const isUserInProject = await ProjectMemberModel.findOne({
      project: projectId,
      user: assignedTo,
    });

    if (!isUserInProject) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const files = req.files as any[];
    const attachments = [];
    for (const file of files) {
      const result = await uploadOnCloudinary(file.path);

      if (!result) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "File upload failed");
      }

      attachments.push({
        url: result.secure_url,
        mimetype: file.mimetype,
        size: file.size,
      });
    }

    const newTask = await TaskModel.create({
      project: projectId,
      title,
      description,
      attachments,
      assignedTo,
      assignedBy: _id,
    });

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          newTask,
          "Task created successfully",
        ),
      );
  });
  public updateTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { projectId, taskId } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }

    // Check if user has permission to update this task
    const userRole = await ProjectMemberModel.findOne({
      project: projectId,
      user: _id,
    });

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    // Only task creator or admin can update task details
    if (userRole.role === USER_ROLES.MEMBER && task.assignedBy.toString() !== _id.toString()) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    // Update fields if provided
    if (title && title.trim() !== task.title.trim()) {
      task.title = title.trim();
    }

    if (description !== undefined && description !== task.description) {
      task.description = description;
    }

    if (assignedTo && assignedTo !== task.assignedTo.toString()) {
      // Verify the new assignee is a project member
      const isUserInProject = await ProjectMemberModel.findOne({
        project: projectId,
        user: assignedTo,
      });

      if (!isUserInProject) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "User is not a project member");
      }
      task.assignedTo = assignedTo;
    }

    if (status && status !== task.status) {
      if (![TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE].includes(status)) {
        throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid status");
      }
      task.status = status;
    }

    await task.save();

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          task,
          "Task updated successfully",
        ),
      );
  });

  public deleteTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { projectId, taskId } = req.params;

    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }

    const userRole =
      (
        await ProjectMemberModel.findOne({
          project: projectId,
          user: _id,
        })
      )?.role ?? null;

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole === USER_ROLES.MEMBER) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (
      userRole === USER_ROLES.PROJECT_ADMIN &&
      task.assignedBy.toString() !== _id.toString()
    ) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    await TaskModel.deleteOne({
      _id: taskId,
    });

    return res
      .status(STATUS_CODE.DELETED_SUCCESSFULLY)
      .json(
        new ApiResponse(
          STATUS_CODE.DELETED_SUCCESSFULLY,
          {},
          "Task deleted successfully",
        ),
      );
  });

  public getSubTasks = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { projectId, taskId } = req.params;
    const { _id } = req.user;
    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }

    const userRole =
      (
        await ProjectMemberModel.findOne({
          project: projectId,
          user: _id,
        })
      )?.role ?? null;

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (
      userRole === USER_ROLES.MEMBER &&
      task.assignedTo.toString() !== _id.toString()
    ) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const subTasks = await SubTaskModel.find({
      task: task._id,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          subTasks,
          "Sub tasks found successfully",
        ),
      );
  });

  public createSubTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { taskId, projectId } = req.params;
    const { title } = req.body;

    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }

    const userRole =
      (
        await ProjectMemberModel.findOne({
          project: task.project,
          user: _id,
        })
      )?.role ?? null;

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole === USER_ROLES.PROJECT_ADMIN) {
      if (task.assignedBy.toString() !== _id.toString()) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      }
    }

    if (!title) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Title is required");
    }

    const subTask = await SubTaskModel.create({
      task: taskId,
      title,
      createdBy: _id,
    });

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          subTask,
          "Sub task created successfully",
        ),
      );
  });

  public updateSubTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;
    const { projectId, taskId, subTaskId } = req.params;
    const { title, isCompleted } = req.body;

    const task = await TaskModel.findById(taskId);
    if (!task || task.project.toString() !== projectId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Task not found");
    }

    const userRole =
      (
        await ProjectMemberModel.findOne({
          project: task.project,
          user: _id,
        })
      )?.role ?? null;

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole === USER_ROLES.PROJECT_ADMIN) {
      if (task.assignedBy.toString() !== _id.toString()) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      }
    }

    const subTask = await SubTaskModel.findById(subTaskId);
    if (!subTask || subTask.task.toString() !== taskId) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Subtask not found");
    }

    if (title && subTask.title.trim() !== title.trim()) {
      subTask.title = title.trim();
    }

    if (isCompleted !== undefined) {
      if (isCompleted) {
        subTask.isCompleted = true;
      } else {
        subTask.isCompleted = false;
      }
    }

    await subTask.save();
    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Sub task updated successfully"),
      );
  });

  public deleteSubTask = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;
    const { taskId, subTaskId } = req.params;

    const subTask = await SubTaskModel.findById(subTaskId);
    if (!subTask) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Sub task not found");
    }

    const userRole =
      (
        await ProjectMemberModel.findOne({
          project: subTask.task,
          user: _id,
        })
      )?.role ?? null;

    if (!userRole) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (userRole === USER_ROLES.MEMBER) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (
      userRole === USER_ROLES.PROJECT_ADMIN &&
      subTask.createdBy.toString() !== _id.toString()
    ) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    await SubTaskModel.deleteOne({
      _id: subTaskId,
      task: taskId,
    });
    return res
      .status(STATUS_CODE.DELETED_SUCCESSFULLY)
      .json(
        new ApiResponse(
          STATUS_CODE.DELETED_SUCCESSFULLY,
          {},
          "Sub task deleted successfully",
        ),
      );
  });
}

export { TaskControllers };
