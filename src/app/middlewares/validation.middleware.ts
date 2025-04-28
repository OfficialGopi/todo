import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utils/async-handler";
import type { ZodEffects, ZodObject, ZodTypeAny } from "zod";
import { ApiError } from "../utils/api-error";
import { STATUS_CODE } from "../constants/statusCodes.constants";

class ValidationMiddleware {
  public validateBody(
    validationSchemas: ZodEffects<
      ZodObject<any, "strict", ZodTypeAny, any, any>,
      any
    >[],
  ): (req: Request, res: Response, next: NextFunction) => void {
    return AsyncHandler(async (req, _, next) => {
      for (const schema of validationSchemas) {
        const { success, error } = schema.safeParse(req.body);

        if (!success || error) {
          const { _errors } = error.format();

          throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            _errors[0] ?? "Something went wrong",
          );
        }
      }
      next();
    });
  }
  public validateParams(
    validationSchemas: ZodEffects<
      ZodObject<any, "strict", ZodTypeAny, any, any>,
      any
    >[],
  ): (req: Request, res: Response, next: NextFunction) => void {
    return AsyncHandler(async (req, _, next) => {
      for (const schema of validationSchemas) {
        const { success, error } = schema.safeParse(req.params);

        if (!success || error) {
          throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            error.format()._errors[0] ?? "Something went wrong",
          );
        }
      }
      next();
    });
  }
  public validateQuery(
    validationSchemas: ZodEffects<
      ZodObject<any, "strict", ZodTypeAny, any, any>,
      any
    >[],
  ): (req: Request, res: Response, next: NextFunction) => void {
    return AsyncHandler(async (req, _, next) => {
      for (const schema of validationSchemas) {
        const { success, error } = schema.safeParse(req.query);

        if (!success || error) {
          throw new ApiError(
            STATUS_CODE.BAD_REQUEST,
            error.format()._errors[0] ?? "Something went wrong",
          );
        }
      }
      next();
    });
  }
}

const validationMiddleware = new ValidationMiddleware();

const validateBody =
  validationMiddleware.validateBody.bind(validationMiddleware);
const validateParams =
  validationMiddleware.validateParams.bind(validationMiddleware);
const validateQuery =
  validationMiddleware.validateQuery.bind(validationMiddleware);

export { validateBody, validateParams, validateQuery };
