import api from "../utils/api";

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  assignedTo: string;
  assignedBy: string;
  project: string;
  dueDate?: string;
  attachments: Array<{
    url: string;
    mimetype: string;
    size: number;
  }>;
  subtasks: Array<{
    _id: string;
    title: string;
    completed: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  project: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: string;
  dueDate?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: "TODO" | "IN_PROGRESS" | "DONE";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  assignedTo?: string;
  dueDate?: string;
}

export interface TaskResponse {
  success: boolean;
  data: Task;
  message: string;
}

export interface TasksResponse {
  success: boolean;
  data: Task[];
  message: string;
}

class TaskService {
  async getTasks(projectId?: string): Promise<Task[]> {
    try {
      const url = projectId ? `/v1/task/project/${projectId}` : "/v1/task";
      const response = await api.get(url);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch tasks");
    }
  }

  async getTaskById(taskId: string): Promise<Task> {
    try {
      const response = await api.get(`/v1/task/${taskId}`);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch task");
    }
  }

  async createTask(data: CreateTaskData): Promise<Task> {
    try {
      const response = await api.post("/v1/task", data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create task");
    }
  }

  async updateTask(taskId: string, data: UpdateTaskData): Promise<Task> {
    try {
      const response = await api.patch(`/v1/task/${taskId}`, data);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to update task");
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    try {
      await api.delete(`/v1/task/${taskId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to delete task");
    }
  }

  async moveTask(
    taskId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE"
  ): Promise<Task> {
    try {
      const response = await api.patch(`/v1/task/${taskId}`, {
        status: newStatus,
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to move task");
    }
  }

  async assignTask(taskId: string, userId: string): Promise<Task> {
    try {
      const response = await api.patch(`/v1/task/${taskId}`, {
        assignedTo: userId,
      });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to assign task");
    }
  }

  async addSubtask(taskId: string, title: string): Promise<Task> {
    try {
      const response = await api.post(`/v1/task/${taskId}/subtask`, { title });
      return response.data.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to add subtask");
    }
  }

  async updateSubtask(
    taskId: string,
    subtaskId: string,
    data: { title?: string; completed?: boolean }
  ): Promise<Task> {
    try {
      const response = await api.patch(
        `/v1/task/${taskId}/subtask/${subtaskId}`,
        data
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update subtask"
      );
    }
  }

  async deleteSubtask(taskId: string, subtaskId: string): Promise<Task> {
    try {
      const response = await api.delete(
        `/v1/task/${taskId}/subtask/${subtaskId}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete subtask"
      );
    }
  }

  async uploadAttachment(taskId: string, file: File): Promise<Task> {
    try {
      const formData = new FormData();
      formData.append("attachment", file);

      const response = await api.post(
        `/v1/task/${taskId}/attachment`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to upload attachment"
      );
    }
  }

  async deleteAttachment(taskId: string, attachmentId: string): Promise<Task> {
    try {
      const response = await api.delete(
        `/v1/task/${taskId}/attachment/${attachmentId}`
      );
      return response.data.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete attachment"
      );
    }
  }
}

export const taskService = new TaskService();
