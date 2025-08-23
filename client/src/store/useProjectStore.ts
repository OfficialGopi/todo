import { create } from "zustand";
import { projectService, Project } from "../services/project.services";
import { taskService, Task, CreateTaskData } from "../services/task.services";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  isLoading: boolean;
  error: string | null;

  // Project actions
  fetchProjects: () => Promise<void>;
  createProject: (data: { name: string; description: string }) => Promise<void>;
  updateProject: (
    projectId: string,
    data: { name?: string; description?: string }
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;

  // Task actions
  fetchTasks: (projectId?: string) => Promise<void>;
  createTask: (data: CreateTaskData) => Promise<void>;
  updateTask: (taskId: string, data: any) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (
    taskId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE"
  ) => Promise<void>;

  // Utility actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,
  tasks: [],
  isLoading: false,
  error: null,

  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),

  // Project actions
  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      const projects = await projectService.getProjects();
      set({ projects, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createProject: async (data: { name: string; description: string }) => {
    try {
      set({ isLoading: true, error: null });
      const newProject = await projectService.createProject(data);
      set((state) => ({
        projects: [...state.projects, newProject],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProject: async (
    projectId: string,
    data: { name?: string; description?: string }
  ) => {
    try {
      set({ isLoading: true, error: null });
      const updatedProject = await projectService.updateProject(
        projectId,
        data
      );
      set((state) => ({
        projects: state.projects.map((p) =>
          p._id === projectId ? updatedProject : p
        ),
        currentProject:
          state.currentProject?._id === projectId
            ? updatedProject
            : state.currentProject,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null });
      await projectService.deleteProject(projectId);
      set((state) => ({
        projects: state.projects.filter((p) => p._id !== projectId),
        currentProject:
          state.currentProject?._id === projectId ? null : state.currentProject,
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setCurrentProject: (project: Project | null) =>
    set({ currentProject: project }),

  // Task actions
  fetchTasks: async (projectId?: string) => {
    try {
      set({ isLoading: true, error: null });
      const tasks = await taskService.getTasks(projectId);
      set({ tasks, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createTask: async (data: CreateTaskData) => {
    try {
      set({ isLoading: true, error: null });
      const newTask = await taskService.createTask(data);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateTask: async (taskId: string, data: any) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskService.updateTask(taskId, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteTask: async (taskId: string) => {
    try {
      set({ isLoading: true, error: null });
      await taskService.deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  moveTask: async (
    taskId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    try {
      set({ isLoading: true, error: null });
      const updatedTask = await taskService.moveTask(taskId, newStatus);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
