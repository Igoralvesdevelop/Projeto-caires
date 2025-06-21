import express, { text } from 'express';
import visitantes from "../services/VisitPer-S.js";
import { vCpf } from '../helpers/validacoes.js';

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
    const { nome, cpf, telefone, genero, rg, nivel_acesso, id_unidade } = request.body;

    try {
        if(!nome || !cpf || !telefone || !genero || !rg || !nivel_acesso || !id_unidade){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
        if (!vCpf(cpf)) {
            return response.status(400).send({ message: "CPF inválido" });
        }
        await visitantes.createVisitante(nome, cpf, telefone, genero, rg, nivel_acesso, id_unidade);
        return response.status(201).send({ "message": "Visitante cadastrado com sucesso" });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao cadastrar visitante", error: error.message });
    }
});

route.put("/:id_visitante", async (request, response) => {
    const { nome, cpf, telefone, genero, rg, nivel_acesso, id_unidade } = request.body;
    const { id_visitante } = request.params;

    try {
        await visitantes.updateVisitante(nome, cpf, telefone, genero,  rg, nivel_acesso, id_unidade, id_visitante);
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
route.get("/cpf/:cpf", async (request, response) => {
    const { cpf } = request.params;

    try {
     
        const visitante = await visitantes.listCpf(cpf);
        if (visitante.length < 1) {
            return response.status(204).end();
        }
        return response.status(200).send({ "message": visitante });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao buscar visitante por CPF", error: error.message });
    }
});

export default route;