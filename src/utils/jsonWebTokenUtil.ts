import * as JWT from "jsonwebtoken";
import IBodyUser from "../interface/IBodyUser.interface";

const superSecretPass = "superSecresPassword";

const createToken = (user: IBodyUser): string => {
  const jwtConfig: JWT.SignOptions = {
    algorithm: "HS256",
    expiresIn: "24h",
  };

  return JWT.sign({ data: user }, superSecretPass, jwtConfig);
};

const readJwt = (jwtToke: string): string | JWT.JwtPayload | undefined => {
  try {
    return JWT.verify(jwtToke, superSecretPass);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export default {
  createToken,
  readJwt,
};
