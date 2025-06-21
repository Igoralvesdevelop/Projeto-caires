import mysql from "../repository/mysql.js";

async function listEventos() {
    const sql = "SELECT * FROM eventos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    await connect.end();
    return rows;
}

async function createEvento(cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento) {
    const sql = `
        INSERT INTO eventos
        (cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento];

    const connect = await mysql.bancoDados();
    try {
        await connect.query(sql, params);
    } finally {
        await connect.end();
    }
}

async function updateEvento(cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, id_evento) {
    const sql = `
        UPDATE eventos SET
        cpf = ?, fk_id_morador = ?, titulo_evento = ?, descricao_evento = ?, tipo = ?, inicio_evento = ?, fim_evento = ?, cor = ?, status_pagamento = ?
        WHERE id_evento = ?
    `;

    const params = [cpf, fk_id_morador, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, id_evento];

    const connect = await mysql.bancoDados();
    await connect.query(sql, params);
    await connect.end();
}

async function deleteEvento(id_evento) {
    const sql = 'DELETE FROM eventos WHERE id_evento = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_evento]);
    await connect.end();
}

async function verificarMorador(cpf, id_morador) {
    const sql = 'SELECT * FROM moradores WHERE cpf = ? AND id_morador = ?';

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [cpf, id_morador]);
    await connect.end();
    return rows.length > 0;
}

export { listEventos, createEvento, updateEvento, deleteEvento, verificarMorador };
