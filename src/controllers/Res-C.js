import express, { request, response } from 'express';
import residencia from "../services/Res-S.js";

const route = express.Router();

route.get("/", async (request, response) => {
    const Residencia = await residencia.listresidencia();
    if (Residencia.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Residencia });
});


route.post("/", async (request, response) => {
    const {bloco, apartamento, andar} = request.body;
    
     if(!bloco || !apartamento || !andar){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
    const id_unidade = `${bloco}-${andar}-${apartamento}`;
    await residencia.createResidencia(id_unidade ,bloco, apartamento, andar);

    return response.status(201).send({ "message": "Residencia cadastrada com sucesso" });
});




route.delete("/:id_unidade", async (request, response) => {
    const { id_unidade } = request.params;

    await residencia.deleteResindencias(id_unidade);

    return response.status(200).send({ "message": "Residencia excluída com sucesso" });
});

export default route;
