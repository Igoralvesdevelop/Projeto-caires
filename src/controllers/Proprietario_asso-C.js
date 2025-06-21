import express, { request, response } from 'express';
import propietarioS from '../services/Propri_associado.js';

const route = express.Router();

route.get("/", async (request, response) => {
    const ProprietarioC = await propietarioS.ListAssociacaoProprietarios();
    if (ProprietarioC.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": ProprietarioC });
});


route.post("/", async (request, response) => {
    const {id_proprietario, id_unidade, status_ocupacao} = request.body;
    
     if(!id_proprietario || !id_unidade || !status_ocupacao){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
    await propietarioS.createAssociacaoProprietario(id_proprietario, id_unidade, status_ocupacao);

    return response.status(201).send({ "message": "Residencia cadastrada com sucesso" });
});


export default route;
