
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
  return ErrorResponse({ status: 400, message: message, extra: extra });
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
