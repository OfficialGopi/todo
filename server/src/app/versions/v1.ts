import express from "express";
import { register as registerAuthRoutes } from "../routes/auth/routes";
import { register as registerProjectRoutes } from "../routes/project/routes";
import { register as registerNoteRoutes } from "../routes/notes/routes";
import { register as registerTaskRoutes } from "../routes/task/routes";

import type { Router } from "express";

function v1(): Router {
  const router = express.Router();

  // ================= VERSION 1 ROUTES ===================
  router.use("/auth", registerAuthRoutes());
  router.use("/project", registerProjectRoutes());
  router.use("/project/id/:projectId/note", registerNoteRoutes());
  router.use("/project/id/:projectId/task", registerTaskRoutes());

  return router;
}

export { v1 };
