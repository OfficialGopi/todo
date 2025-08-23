import { resolveSoa } from "dns";
import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { ProjectModel } from "../../models/project";
import { ProjectMemberModel } from "../../models/project-member";
import { ApiError } from "../../utils/api-error";
import { AsyncHandler } from "../../utils/async-handler";
import { ApiResponse } from "../../utils/api-response";
import { USER_ROLES, USER_ROLES_ENUM } from "../../constants/enums.constants";
import { UserModel } from "../../models/user";

class ProjectsControllers {
  public createProject = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;

    const { name, description } = req.body;

    const project = await ProjectModel.create({
      name,
      description,
      createdBy: _id,
    });

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          project,
          "Project created successfully",
        ),
      );
  });

  public getProjects = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { _id } = req.user;

    const projects = await ProjectMemberModel.find({
      user: _id,
    })
      .select("project")
      .lean();

    const allProjects = [];

    for (const project of projects) {
      const projectDetails = await ProjectModel.findById(
        project.project,
      ).lean();

      allProjects.push(projectDetails);
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          allProjects,
          "Projects found successfully",
        ),
      );
  });

  public getProjectById = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;
    const { projectId } = req.params;

    const project =
      await ProjectModel.findById(projectId).populate("createdBy");
    if (!project) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Project not found");
    }

    const projectMembers = await ProjectMemberModel.find({
      project: project._id,
    })
      .populate("user")
      .lean();

    return res.status(STATUS_CODE.OK).json(
      new ApiResponse(
        STATUS_CODE.OK,
        {
          ...project,
          members: projectMembers,
        },
        "Project found successfully",
      ),
    );
  });

  public updateProject = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    const { projectId } = req.params;
    const { name, description } = req.body;
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Project not found");
    }

    if (!name && !description) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "Name or description is required",
      );
    }

    if (name) {
      project.name = name;
    }

    if (description) {
      project.description = description;
    }

    await project.save();
    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Project updated successfully"),
      );
  });

  public deleteProject = AsyncHandler(async (req, res) => {
    const { projectId } = req.params;

    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { _id } = req.user;

    const project = await ProjectModel.findById(projectId);
    if (!project) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Project not found");
    }

    if (project.createdBy.toString() !== _id.toString()) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    await ProjectModel.deleteOne({ _id: projectId });

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(STATUS_CODE.OK, {}, "Project deleted successfully"),
      );
  });

  public getProjectMembers = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { projectId } = req.params;

    const projectMembers = await ProjectMemberModel.find({
      project: projectId,
    })
      .populate("user")
      .lean();

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          projectMembers,
          "Project members found successfully",
        ),
      );
  });

  public addMemberToProject = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { projectId } = req.params;

    const { email } = req.body;

    const project = await ProjectModel.findById(projectId);
    if (!project) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "Project not found");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const projectMember = await ProjectMemberModel.findOne({
      project: projectId,
      user: user._id,
    });

    if (projectMember) {
      throw new ApiError(
        STATUS_CODE.BAD_REQUEST,
        "User already exists in project",
      );
    }

    await ProjectMemberModel.create({
      project: projectId,
      user: user._id,
      role: USER_ROLES.MEMBER,
    });

    return res
      .status(STATUS_CODE.RESOURSE_CREATED)
      .json(
        new ApiResponse(
          STATUS_CODE.RESOURSE_CREATED,
          {},
          "User added successfully to project",
        ),
      );
  });

  public updateMemberRoleInProject = AsyncHandler(async (req, res) => {
    const { userId } = req.body;

    const { projectId } = req.params;

    const projectMember = await ProjectMemberModel.findOne({
      project: projectId,
      user: userId,
    });

    if (!projectMember) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    const { role } = req.body;

    if (!USER_ROLES_ENUM.includes(role) || role === USER_ROLES.ADMIN) {
      throw new ApiError(STATUS_CODE.BAD_REQUEST, "Invalid role");
    }

    await ProjectMemberModel.updateOne(
      {
        project: projectId,
        user: userId,
      },
      {
        role,
      },
    );

    return res
      .status(STATUS_CODE.OK)
      .json(
        new ApiResponse(
          STATUS_CODE.OK,
          {},
          "User role updated successfully in project",
        ),
      );
  });

  //DELETE MEMBER FROM PROJECT IS NOT FINISHED AS IF DELETING THE USER AND TASKS ARE ASSIGNED HAVE TO BE NULL OR DELETE
  public deleteMemberFromProject = AsyncHandler(async (req, res) => {
    if (!req.user) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const { projectId } = req.params;

    const { userId } = req.body;

    const project = await ProjectMemberModel.deleteOne({
      project: projectId,
      user: userId,
      role: {
        $in: [USER_ROLES.MEMBER, USER_ROLES.PROJECT_ADMIN],
      },
    });

    return res
      .status(STATUS_CODE.DELETED_SUCCESSFULLY)
      .json(
        new ApiResponse(
          STATUS_CODE.DELETED_SUCCESSFULLY,
          {},
          "User deleted successfully from project",
        ),
      );
  });
}

export { ProjectsControllers };
