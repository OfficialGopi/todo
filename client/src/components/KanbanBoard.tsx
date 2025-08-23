import { motion } from "framer-motion";
import { Plus, MoreVertical, User, Calendar } from "lucide-react";
import { useProjectStore } from "../store/useProjectStore";
import { useState, useEffect } from "react";
import { CreateTaskData } from "../services/task.services";

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
    { id: "TODO", title: "To Do", color: "bg-neutral-100 dark:bg-neutral-800" },
    {
      id: "IN_PROGRESS",
      title: "In Progress",
      color: "bg-neutral-200 dark:bg-neutral-700",
    },
    { id: "DONE", title: "Done", color: "bg-neutral-300 dark:bg-neutral-600" },
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
      <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading tasks...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-error-600 mb-4">Error: {error}</div>
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
      <div className="p-6 bg-neutral-50 dark:bg-neutral-950 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-neutral-600 dark:text-neutral-400 mb-4">
            No project selected. Please select a project to view tasks.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          {currentProject.name} - Task Board
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingTask(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-neutral-800 dark:bg-neutral-200 
                     hover:bg-neutral-700 dark:hover:bg-neutral-300 text-white dark:text-neutral-900 
                     rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </motion.button>
      </div>

      {/* Add Task Modal */}
      {isAddingTask && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsAddingTask(false)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-full max-w-md shadow-xl"
          >
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Add New Task
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 
                           rounded-lg focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 
                           focus:border-transparent bg-white dark:bg-neutral-800 
                           text-neutral-900 dark:text-neutral-100"
              />
              <textarea
                placeholder="Task description (optional)"
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 
                           rounded-lg focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 
                           focus:border-transparent bg-white dark:bg-neutral-800 
                           text-neutral-900 dark:text-neutral-100 resize-none"
                rows={3}
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsAddingTask(false)}
                  className="flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 
                             text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-50 
                             dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="flex-1 px-4 py-2 bg-neutral-800 dark:bg-neutral-200 
                             hover:bg-neutral-700 dark:hover:bg-neutral-300 text-white 
                             dark:text-neutral-900 rounded-lg transition-colors duration-200"
                >
                  Add Task
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {column.title}
              </h3>
              <span
                className="px-2 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 
                              dark:text-neutral-300 text-sm rounded-full"
              >
                {getTasksByStatus(column.id).length}
              </span>
            </div>

            <div className={`${column.color} rounded-lg p-4 min-h-[400px]`}>
              <div className="space-y-3">
                {getTasksByStatus(column.id).map((task) => (
                  <motion.div
                    key={task._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white dark:bg-neutral-800 rounded-lg p-4 shadow-md 
                               border border-neutral-200 dark:border-neutral-700 cursor-pointer"
                    onClick={() =>
                      handleMoveTask(task._id, getNextStatus(column.id))
                    }
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {task.title}
                      </h4>
                      <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                    {task.description && (
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
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
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get next status for task movement
const getNextStatus = (
  currentStatus: string
): "TODO" | "IN_PROGRESS" | "DONE" => {
  switch (currentStatus) {
    case "TODO":
      return "IN_PROGRESS";
    case "IN_PROGRESS":
      return "DONE";
    case "DONE":
      return "TODO";
    default:
      return "TODO";
  }
};

export default KanbanBoard;
