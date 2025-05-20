import express from 'express';
import veiculos from "../services/Veic-S.js";
import { validarPlaca } from '../helpers/validacoes.js';

const route = express.Router();

route.get("/", async (req, res) => {
  const veiculosList = await veiculos.listVeiculos();
  if (veiculosList.length < 1) {
    return res.status(204).end();
  }
  return res.status(200).send({ message: veiculosList });
});

route.post("/", async (req, res) => {
  const { modelo, placa, cor, tipo, fk_id_morador } = req.body;

  if (!modelo || !placa || !cor || !tipo || !fk_id_morador) {
    return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
  }

  if (!validarPlaca(placa)) {
    return res.status(400).send({ message: "Placa inválida" });
  }

  await veiculos.createVeiculo(modelo, placa, cor, tipo, fk_id_morador);
  return res.status(201).send({ message: "Veículo cadastrado com sucesso" });
});

route.put("/:id_veiculo", async (req, res) => {
  const { modelo, placa, cor, tipo, fk_id_morador } = req.body;
  const { id_veiculo } = req.params;

  if (!modelo || !placa || !cor || !tipo || !fk_id_morador) {
    return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
  }

  if (!validarPlaca(placa)) {
    return res.status(400).send({ message: "Placa inválida" });
  }

  await veiculos.updateVeiculo(modelo, placa, cor, tipo, fk_id_morador, id_veiculo);
  return res.status(200).send({ message: "Veículo atualizado com sucesso" });
});

route.delete("/:id_veiculo", async (req, res) => {
  const { id_veiculo } = req.params;
  await veiculos.deleteVeiculo(id_veiculo);
  return res.status(200).send({ message: "Veículo excluído com sucesso" });
});

export default route;
