import { motion } from "framer-motion";
import { Plus, MoreVertical, User, Calendar, Paperclip } from "lucide-react";
import { useProjectStore } from "../store/useProjectStore";
import { useState, useEffect } from "react";
import { Task, CreateTaskData } from "../services/task.services";

const KanbanBoard = () => {
  const {
    tasks,
    currentProject,
    createTask,
    moveTask,
    isLoading,
    error,
    fetchTasks,
  } = useProjectStore();

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  useEffect(() => {
    // Fetch tasks when component mounts or project changes
    if (currentProject) {
      fetchTasks(currentProject._id);
    } else {
      fetchTasks();
    }
  }, [currentProject, fetchTasks]);

  const columns = [
    { id: "TODO", title: "To Do", color: "bg-gray-100" },
    { id: "IN_PROGRESS", title: "In Progress", color: "bg-blue-100" },
    { id: "DONE", title: "Done", color: "bg-green-100" },
  ];

  const handleAddTask = async () => {
    if (newTaskTitle.trim() && currentProject) {
      try {
        const taskData: CreateTaskData = {
          title: newTaskTitle,
          description: newTaskDescription,
          project: currentProject._id,
          priority: "MEDIUM",
        };

        await createTask(taskData);
        setNewTaskTitle("");
        setNewTaskDescription("");
        setIsAddingTask(false);
      } catch (error) {
        console.error("Failed to create task:", error);
      }
    }
  };

  const handleMoveTask = async (
    taskId: string,
    newStatus: "TODO" | "IN_PROGRESS" | "DONE"
  ) => {
    try {
      await moveTask(taskId, newStatus);
    } catch (error) {
      console.error("Failed to move task:", error);
    }
  };

  const getTasksByStatus = (status: string) => {
    return tasks.filter((task) => task.status === status);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={() => fetchTasks(currentProject?._id)}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No Project Selected
          </h2>
          <p className="text-gray-600 mb-6">
            Please select a project to view and manage tasks.
          </p>
          <button className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Create Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              {currentProject.name}
            </h1>
            <p className="text-gray-600 mt-2">{currentProject.description}</p>
          </div>
          <button onClick={() => setIsAddingTask(true)} className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Add Task
          </button>
        </div>

        {/* Add Task Modal */}
        {isAddingTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setIsAddingTask(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
              <input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="input-field mb-4"
              />
              <textarea
                placeholder="Task description"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="input-field mb-4 h-24 resize-none"
              />
              <div className="flex space-x-3">
                <button onClick={handleAddTask} className="btn-primary flex-1">
                  Add Task
                </button>
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {columns.map((column) => (
            <motion.div
              key={column.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  {column.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {getTasksByStatus(column.id).length} tasks
                </span>
              </div>

              <div className={`${column.color} rounded-lg p-4 min-h-[500px]`}>
                <div className="space-y-3">
                  {getTasksByStatus(column.id).map((task) => (
                    <motion.div
                      key={task._id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="bg-white rounded-lg p-4 shadow-lg border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-200"
                      onClick={() => {
                        // Find next status
                        const currentIndex = columns.findIndex(
                          (col) => col.id === task.status
                        );
                        const nextIndex = (currentIndex + 1) % columns.length;
                        const nextStatus = columns[nextIndex].id as
                          | "TODO"
                          | "IN_PROGRESS"
                          | "DONE";
                        handleMoveTask(task._id, nextStatus);
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">
                          {task.title}
                        </h4>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {task.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>{task.assignedTo || "Unassigned"}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "No due date"}
                          </span>
                        </div>

                        {task.attachments.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Paperclip className="w-3 h-3" />
                            <span>{task.attachments.length}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {getTasksByStatus(column.id).length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <p className="text-sm">No tasks yet</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
