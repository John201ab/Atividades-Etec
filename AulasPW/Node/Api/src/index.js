import express from "express";
import routes from "./routes.js";
import { AppDataSource } from "./database/config.js";

const serve = express();
serve.use(express.json());
serve.use("/", routes);

AppDataSource.initialize()
  .then(async () => {
    console.log("conectando ao banco de dados");
  })
  .catch((err) => {
    console.log("Falha ao conecta no banco de dados: Motivo" + err);
  });

serve.listen(3333, () => {
  console.log("WELCOME TO THE JUNGLE BABY, YOU GONNA DIEEEEEEE.");
});
