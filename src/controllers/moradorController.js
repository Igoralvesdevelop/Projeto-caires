import express, {request, response} from 'express';

import moradores from "../services/moradorServices.js";

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

    await moradores.CreateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal )

    return response.status(201).send({"message": "Morador cadastrado"})
})
route.put("/:id_morador", async (request, response)=>{

    const {nome, cpf, telefone, genero, dt_nascimento, apartamento ,bloco, senha, email, ramal} = request.body;
    const {id_morador} = request.params;

    await moradores.UpdateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento ,bloco, senha, email, ramal, id_morador)
    return response.status(201).send({"message": "Morador Atulizado"})
})

route.delete("/:id_morador", async (request, response)=>{
    const {id_morador} = request.params;
    
    await moradores.DeleteMoradores(id_morador);
    
    return response.status(200).send({"message":"Usuario excluido com sucesso"})
})
export default route;