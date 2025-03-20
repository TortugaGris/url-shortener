import {NextFunction, Request, Response} from "express";
import {z, ZodError} from "zod";
import {StatusCodes} from "http-status-codes";

/**
 * Validates a request using a Zod schema.
 *
 * @param {z.ZodObject} schema - The schema used to validate the request.
 *
 * @return {void}
 */
export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res.status(StatusCodes.BAD_REQUEST).json({
          error: "Invalid data", details: errorMessages,
        });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
        });
      }
    }
  };
}
