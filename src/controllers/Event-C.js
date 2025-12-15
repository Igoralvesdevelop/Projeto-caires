import express from 'express';
import { listEventos, createEvento, updateEvento, deleteEvento  } from "../services/Event-S.js";
import { vCpf } from "../helpers/validacoes.js";

const route = express.Router();

function converterData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia} 00:00:00`;
}

route.get("/", async (req, res) => {
    const eventos = await listEventos();
    if (eventos.length < 1) return res.status(204).end();
    return res.status(200).send({ message: eventos });
});

route.post("/", async (req, res) => {
    const { id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes } = req.body;

    if (!id_unidade || !id_area || !data_reserva || !hora_inicio || !hora_fim) {
        return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    try {
        await createEvento(id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status || 'confirmada', observacoes || '');
        return res.status(201).send({ message: "Evento cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: `Erro ao cadastrar evento: ${error.message}` });
    }
});

route.put("/:id_evento", async (req, res) => {
    const { id_evento } = req.params;
    const { id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes } = req.body;

    if (!id_unidade || !id_area || !data_reserva || !hora_inicio || !hora_fim) {
        return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    try {
        await updateEvento(id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status || 'confirmada', observacoes || '', id_evento);
        return res.status(200).send({ message: "Evento atualizado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: `Erro ao atualizar evento: ${error.message}` });
    }
});

route.delete("/:id_evento", async (req, res) => {
    const { id_evento } = req.params;
    try {
        await deleteEvento(id_evento);
        return res.status(200).send({ message: "Evento excluído com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: `Erro ao excluir evento: ${error.message}` });
    }
});

export default route;
