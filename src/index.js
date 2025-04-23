//Importando framework express
import express, {request, response} from 'express';
import cors from 'cors'
import routes from './routes.js';
const server = express();
server.use(cors())
server.use(express.json());

server.use("/", routes);

//Definindo porta e mensagem do servidor 
server.listen(3333, ()=>{
    console.log("Server tá on")
});