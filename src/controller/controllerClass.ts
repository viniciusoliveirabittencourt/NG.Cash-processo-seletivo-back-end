import { Request, Response } from "express";
import IBodyUser from "../interface/IBodyUser.interface";
import serviceClass from "../service/serviceClass";
import JWT from "../utils/jsonWebTokenUtil"

export default class controllerCon {
  constructor(private myService = new serviceClass()) {}

  public register = async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: IBodyUser = req.body;

    const { message, status } = await this.myService.createUser({
      username,
      password,
    });

    return res.status(status).send({
      message,
    });
  };

  public login = async (req: Request, res: Response):Promise<Response> => {
    const { username, password }: IBodyUser = req.body;

    const { message, status } = await this.myService.loginUser({
      username,
      password,
    });

    if (status !== 200) {
      return res.status(status).send({ message })
    }

    const token = JWT.createToken({username, password})

    return res.status(status).send({ token })
  }
}
