import express from "express";
import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  const app = express()

  app.use(express.json())

  app.get('/', (req, res) => res.send('Hello World'))

  console.log(`O servidor está rodando na porta: ${process.env.PORT}`)
  app.listen(3001)
})