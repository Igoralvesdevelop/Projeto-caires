//Importar rotas da controller
import express from "express";
import services from "./controllers/funcionarioController";
import services from "./controllers/loginController";
import services from "./controllers/moradorController";
import services from "./controllers/PrestaServicoController";
import services from "./controllers/userController";
import services from "./controllers/veiculosController";
import services from "./controllers/visitanteController";

//Variável de rotas
const routes = express();

//Conectar URL com Controllers
routes.use('/user', userController);
routes.use('/prestaServico', prestaServicoController);
routes.use('/funcionario', funcionarioController);
routes.use('/morador', moradorController);
routes.use('/login', loginController);
routes.use('/veiculos', veiculosController);
routes.use('/visitante', visitanteController);

//Exportando rotas
export default routes;