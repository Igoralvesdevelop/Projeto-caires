//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/funcionarioController.js";


//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario', funcionarioController);

//Exportando rotas
export default routes;