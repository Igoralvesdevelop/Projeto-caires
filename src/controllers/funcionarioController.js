import express, {request, response} from 'express';

import funcionario from "../services/funcionarioServices.js";

const route = express.Router();
route.get("/", async (request, response) =>{
    const Funcionario = await funcionario.listUsuario();
    if(Funcionario.length <1){
        return response.status(204).end()
    }
    return response.status(200).send({"message":Funcionario})
})
route.post("/", async (request, response) =>{
    const {nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso} = request.body;

    await funcionario.CreateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero , nivel_acesso)

    return response.status(201).send({"message": "Funcionario cadastrado"})
})
route.put("/:id_usuario", async (request, response)=>{

    const {nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso} = request.body;
    const {id_usuario} = request.params;

    await funcionario.UpdateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario)
    return response.status(201).send({"message": "Usuario Atulizado"})
})

route.delete("/:id_usuario", async (request, response)=>{
    const {id_usuario} = request.params;
    
    await funcionario.DeleteUsuario(id_usuario);
    
    return response.status(200).send({"message":"Usuario excluido com sucesso"})
})
export default route;