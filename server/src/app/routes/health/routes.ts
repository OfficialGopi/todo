import express from "express";

import type { Router } from "express";
import { HealthController } from "./controllers";
function register(): Router {
  const router = express.Router();

  const controllers = new HealthController();

  //HEALTH CHECK ROUTES
  router.route("/").get(controllers.healthCheck.bind(controllers));

  return router;
}

export { register };
