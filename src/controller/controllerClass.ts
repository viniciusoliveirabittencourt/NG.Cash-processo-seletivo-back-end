import { Request, Response } from "express";
import IBodyUser from "../interface/IBodyUser.interface";
import serviceClass from "../service/serviceClass";

export default class controllerCon {
  constructor(private myService = new serviceClass()) {}

  public register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: IBodyUser = req.body;

    const { message, status, dataReturn } = await this.myService.createUser({
      username,
      password,
    });

    return res.status(status).send({
      message,
      dataReturn,
    });
  };
}
