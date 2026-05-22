import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "201ab",
    entities: ["src/model/*.js"],
    migrations: ["src/database/migrations/*.cjs"],
    database: "projeto_api"
})

//Exportar {} para ser utilizado como Função
export { AppDataSource };