import { Request, Response, NextFunction } from "express";
import IBodyUser from "../interface/IBodyUser.interface";

export default (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { username, password }: IBodyUser = req.body;

  if (!username || !password) {
    return res
      .status(401)
      .send({ message: "É preciso informar o username ou o password!" });
  }

  if (username.length < 3) {
    return res
      .status(401)
      .send({ message: "Username precisa ter mais de 3 caracters!" });
  }

  const regexStrongPass =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z$*&@#]{7,}$/;

  if (!regexStrongPass.test(password)) {
    return res.status(401).send({
      message:
        "Password muito fraca, deve conter ao mínimo 8 caracteres, uma letra minúscula, uma letra maiúscula e um número",
    });
  }

  next();
};
