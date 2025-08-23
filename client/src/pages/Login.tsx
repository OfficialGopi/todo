import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import ThemeToggle from "../components/ThemeToggle";

const Login = () => {
  const [formData, setFormData] = useState({
    credentials: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.credentials, formData.password);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100 
                    dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 
                    flex items-center justify-center px-6 py-12 transition-all duration-500"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-neutral-200/20 to-neutral-300/20 
                     dark:from-neutral-700/20 dark:to-neutral-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 w-60 h-60 bg-gradient-to-br from-neutral-300/20 to-neutral-400/20 
                     dark:from-neutral-600/20 dark:to-neutral-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-20 h-20 bg-gradient-to-br from-neutral-600 to-neutral-800 
                       dark:from-neutral-400 dark:to-neutral-200 rounded-2xl flex items-center 
                       justify-center mx-auto mb-6 shadow-lg"
          >
            <span className="text-white dark:text-neutral-900 font-bold text-3xl">
              T
            </span>
          </motion.div>
          <h1 className="text-3xl font-display font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to your TODOISH account
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          variants={itemVariants}
          className="card-glass p-8 backdrop-blur-md"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Credentials Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  value={formData.credentials}
                  onChange={(e) =>
                    setFormData({ ...formData, credentials: e.target.value })
                  }
                  className="input-field pl-10"
                  placeholder="Enter your email or username"
                  required
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="input-field pl-10 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600 
                             dark:hover:text-neutral-300 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between"
            >
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-neutral-300 dark:border-neutral-600 text-neutral-600 
                             dark:text-neutral-400 focus:ring-neutral-500 dark:focus:ring-neutral-400"
                />
                <span className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 
                           dark:hover:text-neutral-200 transition-colors duration-200"
              >
                Forgot password?
              </Link>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full btn-accent py-3 flex items-center justify-center space-x-2 group"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div variants={itemVariants} className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300 dark:border-neutral-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/10 dark:bg-neutral-900/10 text-neutral-500 dark:text-neutral-400">
                Or continue with
              </span>
            </div>
          </motion.div>

          {/* Social Login Buttons */}
          <motion.div variants={itemVariants} className="space-y-3">
            <button
              className="w-full flex items-center justify-center px-4 py-2 border border-neutral-300 
                               dark:border-neutral-600 rounded-lg text-neutral-700 dark:text-neutral-300 
                               hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </motion.div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <p className="text-neutral-600 dark:text-neutral-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-neutral-800 dark:text-neutral-200 hover:text-neutral-600 
                         dark:hover:text-neutral-400 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
