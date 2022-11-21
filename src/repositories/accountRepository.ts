import { AppDataSource } from "../data-source";
import { Account } from "../entities/Account";

export default AppDataSource.getRepository(Account);
