import jwt from "jsonwebtoken";
import { env } from "../../config/env.service.js";

export const generateToken = async (user) => {
  let signature;
  let refreshSignature;
  let aud;
  switch (user.role) {
    case "1":
      signature = env.accessAdminSignature;
      refreshSignature = env.refreshAdminSignature;
      aud = "admin";
      break;
    case "0":
      signature = env.accessUserSignature;
      refreshSignature = env.refreshUserSignature;
      aud = "user";
      break;
  }

  let accessToken = await jwt.sign({ id: user._id }, signature, {
    expiresIn: "30min",
    audience: aud,
  });
  let refreshToken = await jwt.sign({ id: user._id }, refreshSignature, {
    expiresIn: "1y",
    audience: aud,
  });

  return { accessToken, refreshToken };
};


export const generateNewAccessToken = async (refreshToken) => {
    let data = jwt.decode(refreshToken)
  let signature;
  let refreshSignature;
  let aud;
  switch (data.aud) {
    case "admin":
      signature = env.accessAdminSignature;
      refreshSignature = env.refreshAdminSignature;
      aud = "admin";
      break;
    case "user":
      signature = env.accessUserSignature;
      refreshSignature = env.refreshUserSignature;
      aud = "user";
      break;
  }
let decodedRefreshToken = jwt.verify(refreshToken, refreshSignature);
  let accessToken = await jwt.sign({ id: decodedRefreshToken.id }, signature, {
    expiresIn: "30min",
    audience: aud,
  });


  return { accessToken };
};
