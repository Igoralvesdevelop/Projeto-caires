import express, { request, response } from 'express';
import veiculos from "../services/Veic-S.js";

const route = express.Router();

route.get("/", async (request, response) => {
    const Veiculos = await veiculos.listVeiculos();
    if (Veiculos.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Veiculos });
});


route.post("/", async (request, response) => {
    const { modelo, placa, cor, tipo, fk_id_morador } = request.body;
    
     if(!nome || !placa || !cor || !tipo || !fk_id_morador){
            return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
        }

    await veiculos.createVeiculo(modelo, placa, cor, tipo, fk_id_morador);

    return response.status(201).send({ "message": "Veículo cadastrado com sucesso" });
});

route.put("/:id_veiculo", async (request, response) => {
    const { modelo, placa, cor, tipo, fk_id_morador } = request.body;
    const { id_veiculo } = request.params;

    if(!nome || !placa || !cor || !tipo || !fk_id_morador){
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    await veiculos.updateVeiculo(modelo, placa, cor, tipo, fk_id_morador, id_veiculo);

    return response.status(200).send({ "message": "Veículo atualizado com sucesso" });
});


route.delete("/:id_veiculo", async (request, response) => {
    const { id_veiculo } = request.params;

    await veiculos.deleteVeiculo(id_veiculo);

    return response.status(200).send({ "message": "Veículo excluído com sucesso" });
});

export default route;
