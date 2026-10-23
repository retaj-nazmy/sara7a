import { BadRequestException } from "../exceptions/error.exception.js";

export const validation = (schema) => {
  return (req, res, next) => {
    let { success, error } = schema.safeParse(req.body);

    if (!success) {
      throw BadRequestException({
        message: "invalid data",
        extra: error.issues,
      });
    }
    next();
  };
};
