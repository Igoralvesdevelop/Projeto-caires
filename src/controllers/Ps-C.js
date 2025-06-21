import express, {request, response} from 'express';
import prestadores from "../services/Ps-S.js";
import { vCpf } from "../helpers/validacoes.js"
const route = express.Router();


route.get("/", async (request, response) => {
    const prestadoresCadastrados = await prestadores.listPrestadoresCadastrados();
    if (prestadoresCadastrados.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": prestadoresCadastrados });
});

route.post("/", async (request, response) => {
    const { nome, cpf, uf } = request.body;
    if(!nome || !cpf || !uf){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    await prestadores.createPrestadorCadastrado(nome, cpf, uf);

    return response.status(201).send({ "message": "Prestador cadastrado com sucesso" });
});

route.put("/:id_prestador_servico", async (request, response) => {
    const { nome, cpf, rg, uf } = request.body;
    const { id_prestador_servico } = request.params;
    if(!nome || !cpf || !uf){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }
    
    await prestadores.updatePrestadorCadastrado(nome, cpf, uf, id_prestador_servico);
    return response.status(200).send({ "message": "Prestador atualizado com sucesso" });
});

route.delete("/:id_prestador_servico", async (request, response) => {
    const { id_prestador_servico } = request.params;

    await prestadores.deletePrestadorCadastrado(id_prestador_servico);

    return response.status(200).send({ "message": "Prestador excluído com sucesso" });
});

export default route;