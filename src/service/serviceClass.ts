import IBodyUser from "../interface/IBodyUser.interface";
import accountRepository from "../repositories/accountRepository";
import userRespository from "../repositories/userRespository";

export default class serviceClass {
  public createUser = async (user: IBodyUser): Promise<> => {
    try {
      
    }
  }

  private createAccount = async (username: string): Promise<> => {
    try {
      const newAccount = accountRepository.create({ balance: "100" })
    }
  }
}
