import express from 'express';
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


// Função utilitária para limpar pontos e traços do RG
function limparRg(rg) {
    return rg.replace(/[.\-]/g, '');
}

route.post("/", async (request, response) => {
    let { nome, cpf, rg, nivel_acesso, id_genero } = request.body;
    const permissao = 'Permitido'
    try {
        if(!nome || !cpf || !rg || !nivel_acesso  || !id_genero){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
        if (!vCpf(cpf)) {
            return response.status(400).send({ message: "CPF inválido" });
        }
        rg = limparRg(rg);
        const result = await visitantes.createVisitante(nome, cpf, rg, nivel_acesso, permissao, id_genero);
        return response.status(201).send({ id_visitante: result.id_visitante });
    } catch (error) {
        return response.status(500).send({ "message": "Erro ao cadastrar visitante", error: error.message });
    }
});

route.put("/:id_visitante", async (request, response) => {
    let { nome, cpf, rg, nivel_acesso, permissao, motivo, id_genero } = request.body;
    const { id_visitante } = request.params;

    try {
        rg = limparRg(rg);
        await visitantes.updateVisitante(nome, cpf, rg, nivel_acesso, permissao,motivo, id_genero, id_visitante);
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

route.get("/:id_visitante", async (request, response) => {
    const { id_visitante } = request.params;

    try {
        const visitante = await visitantes.getVisitanteById(id_visitante);
        if (!visitante) {
            return response.status(404).send({ message: "Visitante não encontrado" });
        }
        return response.status(200).send({ message: visitante });
    } catch (error) {
        return response.status(500).send({ message: "Erro ao buscar visitante", error: error.message });
    }
});

export default route;