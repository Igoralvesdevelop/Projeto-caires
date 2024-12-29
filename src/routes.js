//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/funcionarioController.js";
import moradorController from"./controllers/moradorController.js"
import prestadoresCadastrados from "./controllers/PrestaServicoController.js";
//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario', funcionarioController);
routes.use('/morador', moradorController);
routes.use('/prestadoresCadastrados', prestadoresCadastrados)

//Exportando rotas
export default routes;