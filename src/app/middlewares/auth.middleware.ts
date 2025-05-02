import { ObjectId } from "mongoose";
import { env } from "../../env";
import { STATUS_CODE } from "../constants/statusCodes.constants";
import { UserModel } from "../models/user";
import { ApiError } from "../utils/api-error";
import { AsyncHandler } from "../utils/async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthMiddleware {
  verifyAccessToken = AsyncHandler(async (req, res, next) => {
    const accessToken =
      (req.cookies["access-token"] as string).trim() ??
      (req.headers?.Authorization as string | undefined)?.trim().split(" ")[1];

    if (!accessToken) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const decodedToken = jwt.verify(
      accessToken,
      env.ACCESS_TOKEN_SECRET,
    ) as JwtPayload;

    if (!decodedToken || !decodedToken.exp || !decodedToken._id) {
      res.clearCookie("access-token");
      res.clearCookie("refresh-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    const user = await UserModel.findById(decodedToken._id).lean();

    if (!user) {
      res.clearCookie("access-token");
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    if (decodedToken.exp < Date.now() / 1000) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }

    req.user = user;

    next();
  });

  isEmailVerified = AsyncHandler(async (req, _, next) => {
    const user = req.user;

    if (!user) {
      throw new ApiError(STATUS_CODE.NOT_FOUND, "User not found");
    }

    if (!user.isEmailVerified) {
      throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
    }
    next();
  });
}

const authMiddleware = new AuthMiddleware();

const verifyAccessToken = authMiddleware.verifyAccessToken.bind(authMiddleware);
const isEmailVerified = authMiddleware.isEmailVerified.bind(authMiddleware);

export { verifyAccessToken, isEmailVerified };
