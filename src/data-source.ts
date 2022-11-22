import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  database: "ngcashdb",
  port: 5432,
  entities: [`${__dirname}/**/model/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/model/migrations/*.{ts,js}`],
});
