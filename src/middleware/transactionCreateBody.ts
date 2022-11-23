import { NextFunction, Request, Response } from "express";

export default (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { username, value } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).send({
      message:
        "Username inválido ou não informado, username deve ser uma string!",
    });
  }

  if (!value || typeof value !== "number") {
    return res.status(400).send({
      message: "Value inválido ou não informado, value deve ser um number!",
    });
  }

  next();
};
