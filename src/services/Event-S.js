import mysql from "../repository/mysql.js";

async function listEventos() {
    const sql = "SELECT * FROM eventos";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    await connect.end();
    return rows;
}

async function createEvento(id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status = 'confirmada', observacoes = null) {
    const sql = `
        INSERT INTO eventos
        (id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes];

    const connect = await mysql.bancoDados();
    try {
        const [result] = await connect.query(sql, params);
        return { id_evento: result.insertId };
    } finally {
        await connect.end();
    }
}

async function updateEvento(id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes, id_evento) {
    const sql = `
        UPDATE eventos SET
        id_unidade = ?, id_area = ?, data_reserva = ?, hora_inicio = ?, hora_fim = ?, status = ?, observacoes = ?
        WHERE id_evento = ?
    `;
    const params = [id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes, id_evento];

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

export { listEventos, createEvento, updateEvento, deleteEvento };
