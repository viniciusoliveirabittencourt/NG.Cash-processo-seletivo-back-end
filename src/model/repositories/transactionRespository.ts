import { AppDataSource } from "../../data-source";
import { Transactions } from "../entities/Transaction";

export default AppDataSource.getRepository(Transactions);
