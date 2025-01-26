import express from 'express';
import visitantes from "../services/VisitPer-S.js";

const route = express.Router();


route.get("/", async (request, response) => {
    try {
        const visitantesList = await visitantes.listVisitantes();
        if (visitantesList.length < 1) {
            return response.status(204).end();
        }
        return response.status(200).send({ "message": visitantesList });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao listar os visitantes", error: error.message });
    }
});


route.post("/", async (request, response) => {
    const { nome, cpf, rg, uf, nivel_acesso, apartamento, bloco, data_entrada, data_saida, fk_id_morador } = request.body;

    try {
        await visitantes.createVisitante(nome, cpf, rg, uf, nivel_acesso, apartamento, bloco, data_entrada, data_saida, fk_id_morador);
        return response.status(201).send({ "message": "Visitante cadastrado com sucesso" });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao cadastrar visitante", error: error.message });
    }
});


route.put("/:id_visitante", async (request, response) => {
    const {nome, cpf, rg, uf, nivel_acesso, apartamento, bloco, data_entrada, data_saida, fk_id_morador} = request.body;
    const { id_visitante } = request.params;

    try {
        await visitantes.updateVisitante(nome, cpf, rg, uf, nivel_acesso, apartamento, bloco, data_entrada, data_saida, fk_id_morador, id_visitante);
        return response.status(200).send({ "message": "Visitante atualizado com sucesso" });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao atualizar visitante", error: error.message });
    }
});


route.put("/saida/:id_visitante", async (request, response) => {
    const { id_visitante } = request.params;

    try {
        await visitantes.updateDataSaida(id_visitante);
        return response.status(200).send({ "message": "Saída do visitante registrada com sucesso" });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao registrar saída do visitante", error: error.message });
    }
});


route.delete("/:id_visitante", async (request, response) => {
    const { id_visitante } = request.params;

    try {
        await visitantes.deleteVisitante(id_visitante);
        return response.status(200).send({ "message": "Visitante excluído com sucesso" });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao excluir visitante", error: error.message });
    }
});

export default route;
