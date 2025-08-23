import { motion } from "framer-motion";
import { useEffect } from "react";
import { LogOut, Settings, User, Bell } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useProjectStore } from "../store/useProjectStore";
import KanbanBoard from "../components/KanbanBoard";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Dashboard = () => {
  const { user, logout, checkAuth } = useAuthStore();
  const { fetchProjects, fetchTasks, isLoading, error } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Fetch projects and tasks when component mounts
    if (user) {
      fetchProjects();
      fetchTasks();
    }
  }, [user, fetchProjects, fetchTasks]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if API call fails
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-error-600 mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 shadow-lg border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-neutral-600 dark:bg-neutral-400 rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-neutral-900 font-semibold text-lg">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Welcome back, {user?.name}
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {user?.email}
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 
                           hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 
                           rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <KanbanBoard />
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
