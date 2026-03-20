 import express from "express";
 import routes from "./routes.js";

 const server = express();

 server.use("/", routes);
 server.listen(3333, () =>{
    console.log("WELCOME TO THE JUNLGE BABY, YOU GONNA DIEEEEEEEE");
 });
 //ela cria um server que fica ativo 24 horas por dia, a porta que ele usa, (a função não é obrigatoria)