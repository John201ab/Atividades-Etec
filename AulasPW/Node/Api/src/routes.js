import express from "express";
import userController from "./controllers/userController.js";
import actorController from "./controllers/actorController.js";
import diretorController from "./controllers/diretorController.js";
import generoController from "./controllers/generoController.js";
import premiacaoController from "./controllers/premiacaoController.js";
const routes = express();

routes.use("/user", userController);
routes.use("/actor", actorController);
routes.use("/diretor", diretorController);
routes.use("/genero", generoController);
routes.use("/premiacao", premiacaoController);

export default routes;
