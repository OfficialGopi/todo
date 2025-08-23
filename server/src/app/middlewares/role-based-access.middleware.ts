import { STATUS_CODE } from "../constants/statusCodes.constants";
import { ProjectMemberModel } from "../models/project-member";
import { ApiError } from "../utils/api-error";
import { AsyncHandler } from "../utils/async-handler";

class RoleBasedAccessMiddleware {
  public verifyRoleBasedAccess = (allowedRoles: string[]) =>
    AsyncHandler(async (req, _, next) => {
      if (!req.user) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      }

      const { _id } = req.user;
      const { projectId } = req.params;

      const isRoleAllowed: boolean = allowedRoles.includes(
        (
          await ProjectMemberModel.findOne({
            user: _id,
            project: projectId,
          })
        )?.role ?? "",
      );

      if (!isRoleAllowed) {
        throw new ApiError(STATUS_CODE.UNAUTHORIZED, "Unauthorized");
      }

      next();
    });
}

const roleBasedAccessMiddleware = new RoleBasedAccessMiddleware();
const verifyRoleBasedAccess =
  roleBasedAccessMiddleware.verifyRoleBasedAccess.bind(
    roleBasedAccessMiddleware,
  );

export { verifyRoleBasedAccess };
