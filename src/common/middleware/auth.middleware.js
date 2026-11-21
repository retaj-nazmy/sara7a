import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import { BadRequestException } from "../exceptions/error.exception.js";

export const auth = (req, res, next) => {

  if (!req.headers.authorization) {
    throw BadRequestException({ message: "authorization header is required" });
  }

  let [flag, token] = req.headers.authorization.split(" ");
  switch (flag) {

    case "Bearer":
      let decodedToken = jwt.decode(token);
      let signature;
      switch (decodedToken.aud) {
        case "admin":
          signature = env.accessAdminSignature;
          break;

        case "user":
          signature = env.accessUserSignature;
          break;

        default:
          break;
      }
      let decoded = jwt.verify(token, signature);
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        throw BadRequestException({ message: "invalid token" });
      }
  }
};
