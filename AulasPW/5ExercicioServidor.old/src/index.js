 import express from "express";
 import routes from "./routes.js";
 import { AppDataSource } from "./database/config.js";

 const server = express();

 server.use(express.json);

 server.use("/", routes);

AppDataSource.initialize().then(() =>{
   console.log("Conectado no banco de dados");
}).catch((err) => {
   console.log("Falha ao se conectar no banco de dados: " + err);
})

 server.listen(3333, () =>{
    console.log("WELCOME TO THE JUNLGE BABY, YOU GONNA DIEEEEEEEE");
 });
 //ela cria um server que fica ativo 24 horas por dia, a porta que ele usa, (a função não é obrigatoria)n de