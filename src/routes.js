//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/FuncC.js";
import moradorController from "./controllers/Mora-C.js";
import veiculoController from "./controllers/Veic-C.js";
import visitanteController from "./controllers/VisitPer-C.js";
import encomendasController from "./controllers/Enco-C.js";
import eventosController from "./controllers/Event-C.js";
import PSController from "./controllers/Ps-C.js";
import LoginFuncionarioController from "./controllers/Lg-FuncC.js";
import LoginMoradorController from "./controllers/Lg-MoraC.js";
import relatorioRoutes from "./controllers/Relatorios-C.js"; 
import condominioController from "./controllers/Cond-C.js";
import NivelAcessoController from "./controllers/NivelAcessoC.js";
import { verifyJWT } from "./middlewares/jwt.js";

//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/funcionario', funcionarioController);
routes.use('/nivelAcesso', NivelAcessoController);
routes.use('/morador', moradorController);
routes.use('/veiculo', verifyJWT, veiculoController);
routes.use('/visitantes', visitanteController);
routes.use('/encomendas', verifyJWT, encomendasController);
routes.use('/eventos', eventosController);
routes.use('/controlPS', PSController);
routes.use('/loginFuncionario', LoginFuncionarioController);
routes.use('/loginMorador', LoginMoradorController);
routes.use('/relatorios', relatorioRoutes);
routes.use('/condominio', condominioController);
//Exportando rotas
export default routes;
