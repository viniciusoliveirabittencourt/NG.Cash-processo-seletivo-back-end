import bcrypt from "bcryptjs";
import { Account } from "../entities/Account";
import { User } from "../entities/User";
import IBodyUser from "../interface/IBodyUser.interface";
import accountRepository from "../repositories/accountRepository";
import userRespository from "../repositories/userRespository";

export default class serviceClass {
  private errorConsole = (e: any) => {
    console.error("Internal error!\n" + e);
  };

  public createUser = async ({
    username,
    password,
  }: IBodyUser): Promise<User | undefined> => {
    const account = await this.createAccount();

    if (!account) {
      return undefined;
    }

    try {
      const newUser = userRespository.create({
        username,
        password: bcrypt.hashSync(password),
        accountId: account,
      });

      await userRespository.save(newUser);

      return newUser;
    } catch (e) {
      this.errorConsole(e);
      await this.deleteAccount(account.id);
      return undefined;
    }
  };

  private deleteAccount = async (id: number) => {
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
