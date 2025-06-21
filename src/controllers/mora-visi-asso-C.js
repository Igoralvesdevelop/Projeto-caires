import express, { request, response } from 'express';
import moradorVisiAsso from '../services/morador-visi-asso.js';

const route = express.Router();
route.get("/", async (request, response) => {
    const moradorVisitante = await moradorVisiAsso.ListAssociacaoVisitantes();
    if (moradorVisitante.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": moradorVisitante });
});
route.post("/", async (request, response) => {
    const { id_visitante, id_unidade } = request.body;

    if (!id_visitante || !id_unidade) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    await moradorVisiAsso.createAssociacaoVisitante(id_visitante, id_unidade);

    return response.status(201).send({ "message": "Associação de visitante criada com sucesso" });
});


export default route;
