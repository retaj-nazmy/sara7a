import { userModel } from "../../database/model/user.model.js";
import { UnAuthorizedException } from "../exceptions/error.exception.js";

export const checkRole = (roles) => {

  return async (req, res, next) => {
    
    let userData = await userModel.findById(req.user.id);
    if (!userData) {
      throw UnAuthorizedException({ message: "user not found" });
    }
    if (!roles.includes(userData.role)) {
      throw UnAuthorizedException({
        message: "you are not authorized to access this action",
      });
    }
    next();
  };
};
