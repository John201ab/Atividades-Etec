import "reflect-metadata";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  username: "root",
  database: "projeto_api",
  port: 3306,
  password: "201ab",
  entities: ["src/model/*.js"],
  migrations: ["src/database/migrations/*.cjs"],
});

export { AppDataSource };
