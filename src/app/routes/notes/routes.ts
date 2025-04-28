import express from "express";
import {
  isEmailVerified,
  verifyAccessToken,
} from "../../middlewares/auth.middleware";

import type { Router } from "express";
import { NotesControllers } from "./controllers";
import { verifyRoleBasedAccess } from "../../middlewares/role-based-access.middleware";
import { USER_ROLES } from "../../constants/enums.constants";

function register(): Router {
  const router = express.Router();

  const controllers = new NotesControllers();

  router
    .route("/get-all-notes")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getNotes.bind(controllers),
    );

  router
    .route("/create-note")
    .post(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.createNote.bind(controllers),
    );

  router
    .route("/id/:noteId")
    .get(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([
        USER_ROLES.ADMIN,
        USER_ROLES.PROJECT_ADMIN,
        USER_ROLES.MEMBER,
      ]),
      controllers.getNoteById.bind(controllers),
    )
    .patch(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.updateNote.bind(controllers),
    )
    .delete(
      verifyAccessToken,
      isEmailVerified,
      verifyRoleBasedAccess([USER_ROLES.ADMIN, USER_ROLES.PROJECT_ADMIN]),
      controllers.deleteNote.bind(controllers),
    );

  return router;
}
export { register };
