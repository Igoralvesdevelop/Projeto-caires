//Importar rotas da controller
import express from "express";
import funcionarioController from "./controllers/FuncC.js";
import moradorController from "./controllers/Mora-C.js";
import veiculoController from "./controllers/Veic-C.js";
import visitanteController from "./controllers/VisitPer-C.js";
import encomendasController from "./controllers/Enco-C.js";
import eventosController from "./controllers/Event-C.js";
import LoginFuncionarioController from "./controllers/Lg-FuncC.js";
import LoginMoradorController from "./controllers/Lg-MoraC.js";
import MoraVisiAssoController from "./controllers/mora-visi-asso-C.js";
import condominioController from "./controllers/Cond-C.js";
import NivelAcessoController from "./controllers/NivelAcessoC.js";
import PropietarioController from "./controllers/Propri-C.js";
import residenciaController from "./controllers/Res-C.js";
import PropietarioAssController from "./controllers/Proprietario_asso-C.js";
import { verifyJWT } from "./middlewares/jwt.js";

//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/proprietario', PropietarioController);
routes.use('/residencia', residenciaController);
routes.use('/funcionario', funcionarioController);
routes.use('/nivelAcesso', NivelAcessoController);
routes.use('/morador', moradorController);
routes.use('/veiculo', veiculoController);
routes.use('/visitantes', visitanteController);
routes.use('/encomendas', encomendasController);
routes.use('/eventos', eventosController);
routes.use('/loginFuncionario', LoginFuncionarioController);
routes.use('/loginMorador', LoginMoradorController);
routes.use('/moradorVisitanteAssociacao', MoraVisiAssoController);
routes.use('/condominio',   condominioController);
routes.use('/proprietario_associacao', PropietarioAssController);
routes.use("/uploads", express.static("uploads"));

//Exportando rotas
export default routes;
