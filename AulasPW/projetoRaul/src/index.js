import express from 'express';
import routes from './routes.js';
import { AppDataSource } from './database/config.js';
import userModel from "../src/model/user.js"

const server = express();
server.use(express.json());
server.use("/", routes);

//Inicializar a conexão com o banco de dados
AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error("Error connecting to the database" + err);
});

server.listen(3333, () => {
  console.log('Hello WELCOME TO THE JUNGLE BABY, YOU GONNA DIIEEEEEE!'); 
  });

