import { env } from "../../config/env.service.js";

export const ErrorResponse = ({
  status = 400,
  message = "something went wrong",
  extra = undefined,
} = {}) => {
  throw new Error(message, { cause: { status, extra } });
};


export const BadRequestException = ({
  message = "Bad Request",
  extra = undefined,
} = {}) => {
  return ErrorResponse({ status: 400, message: message, extra: extra});
};


export const NotFoundException = ({
  message = "Not Found Error",
  extra = undefined,
} = {}) => {

  return ErrorResponse({ status: 404, message: message, extra: extra });
};


export const ConflictException = ({
  message = "Conflict Error",
  extra = undefined,
} = {}) => {

  return ErrorResponse({ status: 409, message: message, extra: extra });
};

export const UnAuthorizedException = ({
  message = "UnAuthorized Error",
  extra = undefined,
} = {}) => {

  return ErrorResponse({ status: 401, message: message, extra: extra });
};

export const ForbiddenException = ({
  message = "Forbidden Error",
  extra = undefined,
} = {}) => {
    
  return ErrorResponse({ status: 403, message: message, extra: extra });
};


export const globalHandlingError = (err, req, res, next) => {
    const mood = env.mood == "dev";
    console.log("CAUSE:", err.cause);
    console.log("MOOD:", env.mood);

    const status = err.status || err.cause?.status || 500;
    const defaultMessage = "something went wrong";
    const displayErrorMessage = err.message || defaultMessage;

    res.status(status).json({
        stack: mood ? err.stack : null,
        message: mood ? displayErrorMessage : defaultMessage,
        extra: mood ? err.cause?.extra : null
    });
};
