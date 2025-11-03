import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";

export const validateSchema =
  (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, query: req.query, params: req.params });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Validation failed",
          //   ZodError exposes validation problems via the "issues" property.
          errors: err.issues.map((error: any) => ({
            path: error.path.join("."),
            message: error.message,
          })),
        });
      }
    }
  };
