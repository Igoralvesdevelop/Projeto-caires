import express from 'express';
import { listEventos, createEvento, updateEvento, deleteEvento, verificarMorador } from "../services/Event-S.js";
import { vCpf } from "../helpers/validacoes.js";

const route = express.Router();

// Função para converter datas do formato DD/MM/AAAA para YYYY-MM-DD HH:mm:ss
function converterData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia} 00:00:00`; // Adiciona hora padrão
}

route.get("/", async (request, response) => {
    const Eventos = await listEventos();
    if (Eventos.length < 1) {
        return response.status(204).end();
    }
    return response.status(200).send({ "message": Eventos });
});

route.post("/", async (request, response) => {
    const { cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento } = request.body;

    console.log("Dados recebidos no corpo da requisição:", request.body); // Log para depuração

    if (
        !cpf || !fk_id_morador || !titulo_evento || 
        !descricao_evento || !tipo || !inicio_evento || 
        !fim_evento || !cor || !status_pagamento
    ) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    if (tipo.trim() === "") {
        return response.status(400).send({ message: "O campo 'Tipo' não pode estar vazio." });
    }

    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }

    const moradorExiste = await verificarMorador(cpf, fk_id_morador);
    if (!moradorExiste) {
        return response.status(404).send({ message: "Morador não encontrado com as informações fornecidas" });
    }

    const inicioEventoFormatado = converterData(inicio_evento);
    const fimEventoFormatado = converterData(fim_evento);

    try {
        await createEvento(cpf, titulo_evento, descricao_evento, tipo, inicioEventoFormatado, fimEventoFormatado, cor, status_pagamento, fk_id_morador);
        return response.status(201).send({ "message": "Evento cadastrado com sucesso" });
    } catch (error) {
        console.error("Erro ao cadastrar evento:", error.message); // Log do erro
        return response.status(500).send({ message: `Erro ao cadastrar evento: ${error.message}` });
    }
});

route.put("/:id_evento", async (request, response) => {
    const { cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador } = request.body;
    const { id_evento } = request.params;

    console.log("Dados recebidos no corpo da requisição para atualização:", request.body);

    if (
        !cpf || !titulo_evento || !descricao_evento || !tipo || 
        !inicio_evento || !fim_evento || !cor || 
        !status_pagamento || !fk_id_morador
    ) {
        return response.status(400).send({ message: "Todos os campos obrigatórios devem ser preenchidos" });
    }
    if (!vCpf(cpf)) {
        return response.status(400).send({ message: "CPF inválido" });
    }

    const inicioEventoFormatado = converterData(inicio_evento);
    const fimEventoFormatado = converterData(fim_evento);

    await updateEvento(cpf, titulo_evento, descricao_evento, tipo, inicioEventoFormatado, fimEventoFormatado, cor, status_pagamento, fk_id_morador, id_evento);

    return response.status(200).send({ "message": "Evento atualizado com sucesso" });
});

route.delete("/:id_evento", async (request, response) => {
    const { id_evento } = request.params;

    await deleteEvento(id_evento);

    return response.status(200).send({ "message": "Evento excluído com sucesso" });
});

export default route;
