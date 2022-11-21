import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())

  app.use(routes.userRou)

  console.log(`O servidor está rodando na porta: ${3001}`)
  app.listen(3001)
})