import express from 'express';
import userController from './controllers/userControllers.js';
import autorController from './controllers/autorControllers.js';
import route from './controllers/loginController.js';
import {authenticate} from "./utils/jwt.js"
// import diretorController from './controllers/diretorControllers.js';
// import generoController from './controllers/generoControllers.js';
// import premiacaoController from './controllers/premiacaoControllers.js';

const routes = express();

routes.use("/user", authenticate, userController);
routes.use("/autor", autorController);
// routes.use("/author", authenticate, autorController);
routes.use("/login", route)
// routes.use("/diretor", diretorController);
// routes.use("/genero", generoController);
// routes.use("/premiacao", premiacaoController);

export default routes;