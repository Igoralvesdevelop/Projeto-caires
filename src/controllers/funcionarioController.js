import express, {request, response} from 'express';
import funcionario from "../services/funcionarioServices.js";
const route = express.Router();

route.post("/", async (request, response) =>{
    const {nome, email, cpf, senha, telefone, dt_nascimento, genero, imagem_usuario, nivel_acesso} = request.body;

    await funcionario.CreateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero , imagem_usuario, nivel_acesso)

    return response.status(201).send({"message": "Funcionario cadastrado"})
})
export default route;