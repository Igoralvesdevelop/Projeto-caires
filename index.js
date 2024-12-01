//Importando framework express
import express, {request, response} from 'express';

//Importando rotas
import routes from './routes';

//Variável do servidor
const server = express();

server.use(express.json());

server.use("/", routes);

//Definindo porta e mensagem do servidor 
server.listen(3306, ()=>{
    console.log("Server tá on")
});