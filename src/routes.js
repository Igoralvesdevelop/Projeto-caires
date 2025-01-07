//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/Func-C.js";
import moradorController from"./controllers/Mora-C.js"
import prestadoresCadastrados from "./controllers/Ps-C.js";
//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario', funcionarioController);
routes.use('/morador', moradorController);
routes.use('/prestadoresCadastrados', prestadoresCadastrados)

//Exportando rotas
export default routes;