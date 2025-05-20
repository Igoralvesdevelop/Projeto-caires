import express, { request, response } from 'express';
import condominio from "../services/cond-S.js"
import { validarCEP, vCNPJ } from '../helpers/validacoes.js';


const route = express.Router();


route.get("/", async (request, response) => {
    const Condominio = await condominio.listCond();
    if (Condominio.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Condominio });
});


route.post("/", async (request, response) => {
    const {nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj } = request.body;
        if(!nome ||!numero_bloco || !numero_unidades || !ramal || !cep || !endereco, !cnpj ){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }
        if (!vCNPJ(cnpj)) {
            return response.status(400).send({ message: "CNPJ inválido" });
        }
    await condominio.createCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj);

    return response.status(201).send({ "message": "Condominio cadastrado com sucesso" });
});

route.put("/:id_condominio", async (request, response) => {
    const {nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj  } = request.body;
    const { id_condominio } = request.params;
    
    if(!nome, !numero_bloco || !numero_unidades || !ramal || !cep ||!endereco, !cnpj ){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCNPJ(cnpj)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    if (!validarCEP(cep)) {
        return response.status(400).send({ message: "CEP inválido" });
    }

    await condominio.updateCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, id_condominio);

    return response.status(200).send({ "message": "Condominio atualizado com sucesso" });
});


route.delete("/:id_condominio", async (request, response) => {
    const { id_condominio } = request.params;

    await condominio.deleteCondominio(id_condominio);

    return response.status(200).send({ "message": "Condominio excluído com sucesso" });
});

export default route;
