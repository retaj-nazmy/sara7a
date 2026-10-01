import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";
import { BadRequestException } from "../exceptions/error.exception.js";

export const auth = (req, res, next) => {
  let [flag, token] = req.headers.authorization.split(" ");
  switch (flag) {
    case "Basic":
      const basicData = Buffer.from(token, "base64").toString();
      console.log(basicData);

      break;

    case "Bearer":
      let decodedToken = jwt.decode(token);
      let signature;
      switch (decodedToken.aud) {
        case "admin":
          signature = env.accessAdminSignature;
          break;
        case "user":
          signature = env.accessUserSignature;
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
