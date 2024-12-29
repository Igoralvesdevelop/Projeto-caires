import express, {request, response} from 'express';
import prestadores from "../services/prestaServicoServices.js";

const route = express.Router();

// Rotas para prestadores_servicos_cadastrados
route.get("/", async (request, response) => {
    const prestadoresCadastrados = await prestadores.listPrestadoresCadastrados();
    if (prestadoresCadastrados.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": prestadoresCadastrados });
});

route.post("/", async (request, response) => {
    const { nome, cpf, uf } = request.body;

    await prestadores.createPrestadorCadastrado(nome, cpf, uf);

    return response.status(201).send({ "message": "Prestador cadastrado com sucesso" });
});

route.put("/:id_prestador_servico", async (request, response) => {
    const { nome, cpf, rg, uf } = request.body;
    const { id_prestador_servico } = request.params;

    await prestadores.updatePrestadorCadastrado(nome, cpf, uf, id_prestador_servico);
    return response.status(200).send({ "message": "Prestador atualizado com sucesso" });
});

route.delete("/:id_prestador_servico", async (request, response) => {
    const { id_prestador_servico } = request.params;

    await prestadores.deletePrestadorCadastrado(id_prestador_servico);

    return response.status(200).send({ "message": "Prestador excluído com sucesso" });
});

export default route;