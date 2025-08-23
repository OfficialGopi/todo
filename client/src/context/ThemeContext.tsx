import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      return savedTheme;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return "light";
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem("theme", theme);

    // Update document class
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Update CSS custom properties
    if (theme === "dark") {
      root.style.setProperty("--bg-primary", "#0a0a0a");
      root.style.setProperty("--bg-secondary", "#171717");
      root.style.setProperty("--bg-tertiary", "#262626");
      root.style.setProperty("--text-primary", "#fafafa");
      root.style.setProperty("--text-secondary", "#a3a3a3");
      root.style.setProperty("--border-color", "#404040");
    } else {
      root.style.setProperty("--bg-primary", "#ffffff");
      root.style.setProperty("--bg-secondary", "#fafafa");
      root.style.setProperty("--bg-tertiary", "#f5f5f5");
      root.style.setProperty("--text-primary", "#171717");
      root.style.setProperty("--text-secondary", "#525252");
      root.style.setProperty("--border-color", "#e5e5e5");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
