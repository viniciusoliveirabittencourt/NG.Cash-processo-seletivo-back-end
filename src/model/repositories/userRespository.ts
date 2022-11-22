import { AppDataSource } from "../../data-source";
import { User } from "../entities/User";

export default AppDataSource.getRepository(User);
