import express from "express";
import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

import type { Router } from "express";
import { ProjectsControllers } from "./controllers";
import { verifyRoleBasedAccess } from "../../middlewares/role-based-access.middleware";
import { USER_ROLES } from "../../constants/enums.constants";

function register(): Router {
  const router = express.Router();

  const controllers = new ProjectsControllers();

  router
    .route("/get-all-projects")
    .get(
      verifyAccessToken,
      isEmailVerified,
      controllers.getProjects.bind(controllers),
    );

  router
    .route("/create-project")
    .post(
      verifyAccessToken,
      isEmailVerified,
      controllers.createProject.bind(controllers),
    );

  router
    .route("/id/:projectId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getProjectById.bind(controllers),
    )
    .put(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN]),
      controllers.updateProject.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN]),
      controllers.deleteProject.bind(controllers),
    );

  router
    .route("/id/:projectId/members")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getProjectMembers.bind(controllers),
    )
    .post(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.addMemberToProject.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.deleteMemberFromProject.bind(controllers),
    )
    .put(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.updateMemberRoleInProject.bind(controllers),
    );

  return router;
}
export { register };
