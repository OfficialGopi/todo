import api from "../utils/api";

export interface Project {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: Array<{
    user: string;
    role: "ADMIN" | "PROJECT_ADMIN" | "MEMBER";
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  description: string;
}

export interface UpdateProjectData {
  name?: string;
  description?: string;
}

export interface ProjectResponse {
  success: boolean;
  data: Project;
  message: string;
}

export interface ProjectsResponse {
  success: boolean;
  data: Project[];
  message: string;
}

class ProjectService {
  async getProjects(): Promise<Project[]> {
    try {
      const response = await api.get("/v1/project");
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch projects"
      );
    }
  }

  async getProjectById(projectId: string): Promise<Project> {
    try {
      const response = await api.get(`/v1/project/${projectId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch project"
      );
    }
  }

  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      const response = await api.post("/v1/project", data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create project"
      );
    }
  }

  async updateProject(
    projectId: string,
    data: UpdateProjectData
  ): Promise<Project> {
    try {
      const response = await api.patch(`/v1/project/${projectId}`, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update project"
      );
    }
  }

  async deleteProject(projectId: string): Promise<void> {
    try {
      await api.delete(`/v1/project/${projectId}`);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete project"
      );
    }
  }

  async addMemberToProject(
    projectId: string,
    userId: string,
    role: string
  ): Promise<Project> {
    try {
      const response = await api.post(`/v1/project/${projectId}/member`, {
        userId,
        role,
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to add member to project"
      );
    }
  }

  async updateMemberRole(
    projectId: string,
    userId: string,
    role: string
  ): Promise<Project> {
    try {
      const response = await api.patch(
        `/v1/project/${projectId}/member/${userId}`,
        { role }
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update member role"
      );
    }
  }

  async removeMemberFromProject(
    projectId: string,
    userId: string
  ): Promise<Project> {
    try {
      const response = await api.delete(
        `/v1/project/${projectId}/member/${userId}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to remove member from project"
      );
    }
  }
}

export const projectService = new ProjectService();
