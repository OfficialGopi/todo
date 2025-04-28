// IMPORT TYPES
import type { Application } from "express";

// IMPORT MODULES
import express from "express";
import cors from "cors";
import { env } from "../env";
import { logger } from "../logger";
import cookieParser from "cookie-parser";
import { register as registerHealthRoutes } from "./routes/health/routes";
import { v1 as registerV1Routes } from "./versions/v1";
import { ApiError } from "./utils/api-error";
import { STATUS_CODE } from "./constants/statusCodes.constants";
import { errorMiddleware } from "./middlewares/error.middleware";
function createApp(): Application {
  const app = express();

  // =====MIDDLEWARES=====

  // CORS
  app.use(
    cors({
      origin: env.ORIGIN,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    }),
  );

  // REQUEST BODY,PARAMS AND QUERY PARSING
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  // STATIC FILES
  app.use(express.static("public"));

  // COOKIE PARSING
  app.use(cookieParser());

  // LOGGING
  app.use((req, _, next) => {
    logger.info(`## REQUEST RECEIVED : ${req.method} ${req.url}  ##`);
    next();
  });

  // HEALTH CHECK ROUTE
  app.use("/api/health", registerHealthRoutes());

  // API VERSIONING
  app.use("/api/v1", registerV1Routes());

  // ALL OTHER ROUTES WHICH ARE NOT AVAILABLE
  app.use(() => {
    throw new ApiError(STATUS_CODE.BAD_REQUEST, "Route Not Found");
  });

  // GLOBAL ERROR HANDLING
  app.use(errorMiddleware);

  return app;
}

export { createApp };
