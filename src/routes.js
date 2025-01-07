//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/FuncC.js";
import moradorController from"./controllers/Mora-C.js";
import veiculoController from "./controllers/Veic-C.js";
import visitanteController from "./controllers/Visit-C.js";
import encomendasController from "./controllers/Enco-C.js";
import eventosController from "./controllers/Event-C.js";
import PSController from "./controllers/Ps-C.js";
//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario', funcionarioController);
routes.use('/morador', moradorController);
routes.use('/veiculo', veiculoController);
routes.use('/visitantes', visitanteController);
routes.use('/encomendas', encomendasController);
routes.use('/eventos', eventosController);
routes.use('/controlPS', PSController);
//Exportando rotas
export default routes;