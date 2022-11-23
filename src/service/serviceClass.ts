import bcrypt from "bcryptjs";
import { Account } from "../model/entities/Account";
import { User } from "../model/entities/User";
import IBodyUser from "../interface/IBodyUser.interface";
import IReturnService from "../interface/IReturnService";
import accountRepository from "../model/repositories/accountRepository";
import userRespository from "../model/repositories/userRespository";

export default class serviceClass {
  private errorConsole = (e: any): void => {
    console.error("Internal error!\n" + e);
  };

  public loginUser = async ({
    username,
    password,
  }: IBodyUser): Promise<IReturnService> => {
    const findUser = await this.verifyUser(username);

    if (!findUser) {
      return {
        message: "Servel internal error!",
        status: 500,
      };
    }

    if (
      typeof findUser === "number" ||
      !bcrypt.compareSync(password, findUser.password)
    ) {
      return {
        message: "Username ou password incorreto!",
        status: 400,
      };
    }

    return {
      message: "Login realizado com sucesso!",
      status: 200,
    };
  };

  public createUser = async ({
    username,
    password,
  }: IBodyUser): Promise<IReturnService> => {
    const findUser = await this.verifyUser(username);

    if (findUser !== 1) {
      return {
        message: "Usuário já existe!",
        status: 400,
      };
    }

    if (!findUser) {
      return {
        message: "Servel internal error!",
        status: 500,
      };
    }

    const account = await this.createAccount();

    if (!account) {
      return {
        message: "Servel internal error!",
        status: 500,
      };
    }

    try {
      const newUser = userRespository.create({
        username,
        password: bcrypt.hashSync(password),
        accountId: account,
      });

      await userRespository.save(newUser);

      return {
        message: "Usuário cadastrado com sucesso!",
        status: 201,
      };
    } catch (e) {
      this.errorConsole(e);
      await this.deleteAccount(account.id);
      return {
        message: "Servel internal error!",
        status: 500,
      };
    }
  };

  private verifyUser = async (
    username: string
  ): Promise<User | number | undefined> => {
    try {
      const findUser = await userRespository.findOneBy({ username });

      if (!findUser) {
        return 1;
      }

      return findUser;
    } catch (e) {
      this.errorConsole(e);
      return undefined;
    }
  };

  private deleteAccount = async (id: number): Promise<Account | void> => {
    try {
      await accountRepository.delete(id);
    } catch (e) {
      this.errorConsole(e);
    }
  };

  private createAccount = async (): Promise<Account | undefined> => {
    try {
      const newAccount = accountRepository.create({ balance: 100 });

      await accountRepository.save(newAccount);

      return newAccount;
    } catch (e) {
      this.errorConsole(e);
      return undefined;
    }
  };
}
