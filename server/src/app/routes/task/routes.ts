import express from "express";
import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

import type { Router } from "express";
import { TaskControllers } from "./controllers";
import { verifyRoleBasedAccess } from "../../middlewares/role-based-access.middleware";
import { USER_ROLES } from "../../constants/enums.constants";
import { taskUpload } from "../../middlewares/file-handling.middleware";

function register(): Router {
  const router = express.Router();

  const controllers = new TaskControllers();

  router
    .route("/get-all-tasks")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getTasks.bind(controllers),
    );

  router
    .route("/create-task")
    .post(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      taskUpload,
      controllers.createTask.bind(controllers),
    );

  router
    .route("/id/:taskId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getTaskById.bind(controllers),
    )
    .put(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.updateTask.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.deleteTask.bind(controllers),
    );

  router
    .route("/id/:taskId/create-subtask")
    .post(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.createSubTask.bind(controllers),
    );

  router
    .route("/id/:taskId/subtask/id/:subTaskId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getSubTasks.bind(controllers),
    )
    .put(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.updateSubTask.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.deleteSubTask.bind(controllers),
    );

  return router;
}
export { register };
