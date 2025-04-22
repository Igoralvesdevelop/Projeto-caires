import express, {request, response} from 'express';
import { vCpf } from '../helpers/validacoes.js';
import moradores from "../services/Mora-S.js";

const route = express.Router();
route.get("/", async (request, response) =>{
    const Morador = await moradores.listMorador();
    if(Morador.length <1){
        return response.status(204).end()
    }
    return response.status(200).send({"message":Morador})
})
route.post("/", async (request, response) =>{
    const {nome, cpf, telefone, genero, dt_nascimento, apartamento ,bloco, senha, email, ramal} = request.body;
    if(!nome || !cpf || !telefone || !genero || !dt_nascimento || !apartamento || !bloco || !senha || !ramal){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!validarCPF(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    if(senha.length < 8){
        return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
    }
    await moradores.CreateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal )
    
    return response.status(201).send({"message": "Morador cadastrado"})
})
route.put("/:id_morador", async (request, response)=>{

    const {nome, cpf, telefone, genero, dt_nascimento, apartamento ,bloco, senha, email, ramal} = request.body;
    const {id_morador} = request.params;
    
    if(!nome || !cpf || !telefone || !genero || !dt_nascimento || !apartamento || !bloco || !senha || !ramal){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!validarCPF(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    if(senha.length < 8){
    return response.status(400).send({"message": "A Senha Deve Possuir 8 Caracteres"})
    }
    await moradores.UpdateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal, id_morador )

    return response.status(201).send({"message": "Morador atualizado com sucesso"})
})

route.delete("/:id_morador", async (request, response)=>{
    const {id_morador} = request.params;
    
    await moradores.DeleteMoradores(id_morador);
    
    return response.status(200).send({"message":"Usuario excluido com sucesso"})
})
export default route;