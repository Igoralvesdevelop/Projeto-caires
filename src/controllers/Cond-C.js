import express from 'express';
import condominio from "../services/cond-S.js";
import { validarCEP, vCNPJ } from '../helpers/validacoes.js';

const route = express.Router();

route.get("/", async (request, response) => {
    try {
        const condominios = await condominio.listCond();
        if (condominios.length < 1) {
            return response.status(204).end();
        }
        return response.status(200).send({ message: condominios });
    } catch (error) {
        return response.status(500).send({ message: "Erro interno ao listar condomínios", error: error.message });
    }
});

route.post("/", async (request, response) => {
    const { nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj } = request.body;

    if (!nome || !numero_bloco || !numero_unidades || !ramal || !cep || !endereco || !cnpj) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    if (!vCNPJ(cnpj)) {
        return response.status(400).send({ message: "CNPJ inválido" });
    }

    if (!validarCEP(cep)) {
        return response.status(400).send({ message: "CEP inválido" });
    }

    try {
        const novoCondominio = await condominio.createCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj);
        return response.status(201).send({
            message: "Condomínio cadastrado com sucesso",
            codigo: novoCondominio.id_condominio
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return response.status(409).send({ message: "CNPJ já cadastrado para outro condomínio." });
        }
        return response.status(500).send({ message: "Erro interno ao cadastrar condomínio", error: error.message });
    }
});

route.put("/:id_condominio", async (request, response) => {
    const { nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj } = request.body;
    const { id_condominio } = request.params;

    if (!nome || !numero_bloco || !numero_unidades || !ramal || !cep || !endereco || !cnpj) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    if (!vCNPJ(cnpj)) {
        return response.status(400).send({ message: "CNPJ inválido" });
    }

    if (!validarCEP(cep)) {
        return response.status(400).send({ message: "CEP inválido" });
    }

    try {
        await condominio.updateCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, id_condominio);
        return response.status(200).send({ message: "Condomínio atualizado com sucesso" });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return response.status(409).send({ message: "CNPJ já cadastrado para outro condomínio." });
        }
        return response.status(500).send({ message: "Erro interno ao atualizar condomínio", error: error.message });
    }
});

route.delete("/:id_condominio", async (request, response) => {
    const { id_condominio } = request.params;

    try {
        await condominio.deleteCondominio(id_condominio);
        return response.status(200).send({ message: "Condomínio excluído com sucesso" });
    } catch (error) {
        return response.status(500).send({ message: "Erro interno ao excluir condomínio", error: error.message });
    }
});

export default route;
