import { Request, Response } from "express";
import IBodyUser from "../interface/IBodyUser.interface";
import serviceClass from "../service/serviceClass";
import JWT from "../utils/jsonWebTokenUtil";

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

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password }: IBodyUser = req.body;

    const { message, status } = await this.myService.loginUser({
      username,
      password,
    });

    if (status !== 200) {
      return res.status(status).send({ message });
    }

    const token = JWT.createToken({ username, password });

    return res.status(status).send({ token });
  };

  public account = async (req: Request, res: Response): Promise<Response> => {
    const { user } = req.headers;

    if (typeof user !== "string") {
      return res.status(500).send({ message: "Servel internal error!" });
    }

    const { dataReturn, status, message } = await this.myService.getUser(user);

    if (status !== 200) {
      return res.status(status).send({ message });
    }

    return res.status(status).send({
      username: dataReturn.username,
      balance: dataReturn.accountId.balance
    });
  };
}
