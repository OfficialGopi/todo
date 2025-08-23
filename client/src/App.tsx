import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Router as AppRouter } from "./router/Router";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />

        <AppRouter />
      </div>
    </Router>
  );
}

export default App;
