import { createRoot } from "react-dom/client";
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </>,
);
