import express from 'express';
import { listEventos, createEvento, updateEvento, deleteEvento, verificarMorador } from "../services/Event-S.js";
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
    const { cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento } = req.body;

    if (
        !cpf || !fk_id_morador || !titulo_evento ||
        !descricao_evento || !tipo || !inicio_evento ||
        !fim_evento || !cor || !status_pagamento
    ) {
        return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    if (!vCpf(cpf)) {
        return res.status(400).send({ message: "CPF inválido" });
    }

    const moradorExiste = await verificarMorador(cpf, fk_id_morador);
    if (!moradorExiste) {
        return res.status(404).send({ message: "Morador não encontrado com as informações fornecidas" });
    }

    const inicioEventoFormatado = converterData(inicio_evento);
    const fimEventoFormatado = converterData(fim_evento);

    try {
        await createEvento(cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicioEventoFormatado, fimEventoFormatado, cor, status_pagamento);
        return res.status(201).send({ message: "Evento cadastrado com sucesso" });
    } catch (error) {
        return res.status(500).send({ message: `Erro ao cadastrar evento: ${error.message}` });
    }
});

route.put("/:id_evento", async (req, res) => {
    const { cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento } = req.body;
    const { id_evento } = req.params;

    if (
        !cpf || !fk_id_morador || !titulo_evento || !descricao_evento || !tipo ||
        !inicio_evento || !fim_evento || !cor || !status_pagamento
    ) {
        return res.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    if (!vCpf(cpf)) {
        return res.status(400).send({ message: "CPF inválido" });
    }

    const inicioEventoFormatado = converterData(inicio_evento);
    const fimEventoFormatado = converterData(fim_evento);

    try {
        await updateEvento(cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicioEventoFormatado, fimEventoFormatado, cor, status_pagamento, id_evento);
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
