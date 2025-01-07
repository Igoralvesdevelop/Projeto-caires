import express, { request, response } from 'express';
import visitantes from "../services/Visit-S.js";

const route = express.Router();


route.get("/", async (request, response) => {
    const Visitantes = await visitantes.listVisitantes();
    if (Visitantes.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Visitantes });
});


route.post("/", async (request, response) => {
    const { nome, cpf, rg, uf } = request.body;

    await visitantes.createVisitante(nome, cpf, rg, uf);

    return response.status(201).send({ "message": "Visitante cadastrado com sucesso" });
});

route.put("/:id_visitante", async (request, response) => {
    const { nome, cpf, rg, uf } = request.body;
    const { id_visitante } = request.params;

    await visitantes.updateVisitante(nome, cpf, rg, uf, id_visitante);

    return response.status(201).send({ "message": "Visitante atualizado com sucesso" });
});


route.delete("/:id_visitante", async (request, response) => {
    const { id_visitante } = request.params;

    await visitantes.deleteVisitante(id_visitante);

    return response.status(200).send({ "message": "Visitante excluído com sucesso" });
});

export default route;