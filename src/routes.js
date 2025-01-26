//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/FuncC.js";
import moradorController from"./controllers/Mora-C.js";
import veiculoController from "./controllers/Veic-C.js";
import visitanteController from "./controllers/VisitPer-C.js";
import encomendasController from "./controllers/Enco-C.js";
import eventosController from "./controllers/Event-C.js";
import PSController from "./controllers/Ps-C.js";
import LoginFuncionarioController from "./controllers/Lg-FuncC.js"
import LoginMoradorController from "./controllers/Lg-MoraC.js"
import { verifyJWT } from "./middlewares/jwt.js";
//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario',verifyJWT, funcionarioController);
routes.use('/morador', moradorController);
routes.use('/veiculo', veiculoController);
routes.use('/visitantes', visitanteController);
routes.use('/encomendas', encomendasController);
routes.use('/eventos', eventosController);
routes.use('/controlPS', PSController);
routes.use('/loginFunciorario', LoginFuncionarioController);
routes.use('/loginMorador', LoginMoradorController);
//Exportando rotas
export default routes;