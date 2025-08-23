import express from "express";
import { verifyAccessToken } from "../../middlewares/auth.middleware";
import { AuthControllers } from "./controllers";
import { validateBody } from "../../middlewares/validation.middleware";
import { authValidators } from "../../validators/auth.validators";

import type { Router } from "express";

function register(): Router {
  const router = express.Router();

  const controllers = new AuthControllers();

  router
    .route("/signup")
    .post(
      validateBody([authValidators.validateSignupObject]),
      controllers.signup.bind(controllers),
    );

  router
    .route("/login")
    .post(
      validateBody([authValidators.validateAuthLoginObject]),
      controllers.login.bind(controllers),
    );

  router
    .route("/verify-email/:token")
    .get(controllers.verifyEmail.bind(controllers));

  router
    .route("/resend-email-verification-token")
    .patch(
      verifyAccessToken,
      controllers.resendEmailVerification.bind(controllers),
    );

  router
    .route("/refresh-access-token")
    .patch(controllers.refreshAccessToken.bind(controllers));

  router
    .route("/logout")
    .delete(verifyAccessToken, controllers.logout.bind(controllers));

  router
    .route("/change-current-password")
    .put(
      verifyAccessToken,
      validateBody([authValidators.validateAuthChangeCurrentPasswordObject]),
      controllers.changeCurrentPassword.bind(controllers),
    );

  router
    .route("/forgot-password-request")
    .post(controllers.forgotPasswordRequest.bind(controllers));

  router
    .route("/reset-forgotten-password")
    .post(controllers.resetForgottenPassword.bind(controllers));

  return router;
}

export { register };
