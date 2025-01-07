import express, { request, response } from 'express';
import encomendas from "../services/Enco-S.js";

const route = express.Router();


route.get("/", async (request, response) => {
    const Encomendas = await encomendas.listEncomendas();
    if (Encomendas.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Encomendas });
});


route.post("/", async (request, response) => {
    const { empresa, data_entrega, fk_id_morador, status_entrega } = request.body;

    await encomendas.createEncomenda(empresa, data_entrega, fk_id_morador, status_entrega);

    return response.status(201).send({ "message": "Encomenda cadastrada com sucesso" });
});


route.put("/:id_encomenda", async (request, response) => {
    const { empresa, data_entrega, fk_id_morador, status_entrega } = request.body;
    const { id_encomenda } = request.params;

    await encomendas.updateEncomenda(empresa, data_entrega, fk_id_morador, status_entrega, id_encomenda);

    return response.status(200).send({ "message": "Encomenda atualizada com sucesso" });
});


route.delete("/:id_encomenda", async (request, response) => {
    const { id_encomenda } = request.params;

    await encomendas.deleteEncomenda(id_encomenda);

    return response.status(200).send({ "message": "Encomenda excluída com sucesso" });
});

export default route;
