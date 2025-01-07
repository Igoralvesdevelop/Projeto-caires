import express, { request, response } from 'express';
import eventos from "../services/Event-S.js";

const route = express.Router();


route.get("/", async (request, response) => {
    const Eventos = await eventos.listEventos();
    if (Eventos.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Eventos });
});


route.post("/", async (request, response) => {
    const { cpf, titulo_evento, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador } = request.body;

    await eventos.createEvento(cpf, titulo_evento, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador);

    return response.status(201).send({ "message": "Evento cadastrado com sucesso" });
});

route.put("/:id_evento", async (request, response) => {
    const { cpf, titulo_evento, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador } = request.body;
    const { id_evento } = request.params;

    await eventos.updateEvento(cpf, titulo_evento, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador, id_evento);

    return response.status(200).send({ "message": "Evento atualizado com sucesso" });
});


route.delete("/:id_evento", async (request, response) => {
    const { id_evento } = request.params;

    await eventos.deleteEvento(id_evento);

    return response.status(200).send({ "message": "Evento excluído com sucesso" });
});

export default route;
