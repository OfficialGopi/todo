import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-neutral-800/50 backdrop-blur-md border border-neutral-700/50 
                 hover:bg-neutral-700/50 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-600/20 to-neutral-800/20"
        animate={{
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10"
        animate={{
          rotate: theme === "dark" ? 0 : 180,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-neutral-300" />
        )}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          boxShadow:
            theme === "dark"
              ? "0 0 20px rgba(168, 85, 247, 0.4)"
              : "0 0 20px rgba(245, 158, 11, 0.4)",
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
