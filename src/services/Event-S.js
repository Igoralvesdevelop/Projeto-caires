import mysql from "../repository/mysql.js";

async function listEventos() {
    const sql = "SELECT * FROM eventos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createEvento(cpf, titulo_evento, descricao_evento,tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador) {
    const sql = 'INSERT INTO eventos(cpf, titulo_evento, descricao_evento, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const infoEvento = [cpf, titulo_evento,descricao_evento,tipo ,inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoEvento);
    connect.end;
}

async function updateEvento(cpf, titulo_evento, descricao_evento,tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador) {
    const sql = 'UPDATE eventos SET cpf = ?, titulo_evento = ?, inicio_evento = ?, fim_evento = ?, cor = ?, status_pagamento = ?, fk_id_morador = ? WHERE id_evento = ?';

    const infoEvento = [cpf, titulo_evento, descricao_evento,tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoEvento);
    connect.end;
}

async function deleteEvento(id_evento) {
    const sql = 'DELETE FROM eventos WHERE id_evento = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_evento]);
    connect.end;
}

export default { listEventos, createEvento, updateEvento, deleteEvento };
