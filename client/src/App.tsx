import { Toaster } from "react-hot-toast";
import { Router as AppRouter } from "./router/Router";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border-color)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fafafa",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fafafa",
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
