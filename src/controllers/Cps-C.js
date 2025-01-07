import express, { request, response } from 'express';
import controlePrestadores from "../services/Cps-S.js";

const route = express.Router();

route.get("/", async (request, response) => {
    const prestadores = await controlePrestadores.listControlePrestadores();
    if (prestadores.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": prestadores });
});


route.post("/", async (request, response) => {
    const { nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico } = request.body;

    await controlePrestadores.createControlePrestador(nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico);

    return response.status(201).send({ "message": "Controle de prestador cadastrado com sucesso" });
});


route.put("/:id_prestador_servico", async (request, response) => {
    const { nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico } = request.body;
    const { id_prestador_servico } = request.params;

    await controlePrestadores.updateControlePrestador(nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico, id_prestador_servico);

    return response.status(200).send({ "message": "Controle de prestador atualizado com sucesso" });
});

route.delete("/:id_prestador_servico", async (request, response) => {
    const { id_prestador_servico } = request.params;

    await controlePrestadores.deleteControlePrestador(id_prestador_servico);

    return response.status(200).send({ "message": "Controle de prestador excluído com sucesso" });
});

export default route;
