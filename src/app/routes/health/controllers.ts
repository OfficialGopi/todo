import { STATUS_CODE } from "../../constants/statusCodes.constants";
import { ApiResponse } from "../../utils/api-response";
import { AsyncHandler } from "../../utils/async-handler";

class HealthController {
  healthCheck = AsyncHandler(async (req, res) => {
    return res
      .status(STATUS_CODE.OK)
      .json(new ApiResponse(STATUS_CODE.OK, {}, "Health Check Successful"));
  });
}

export { HealthController };
