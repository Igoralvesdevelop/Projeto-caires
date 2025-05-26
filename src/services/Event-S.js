import mysql from "../repository/mysql.js";

async function listEventos() {
    const sql = "SELECT * FROM eventos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createEvento(cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador) {
    const sql = 'INSERT INTO eventos(cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const infoEvento = [cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador];

    console.log("Dados enviados para o banco:", infoEvento); // Log para depuração

    const connect = await mysql.bancoDados();
    try {
        await connect.query(sql, infoEvento);
    } catch (error) {
        console.error("Erro ao inserir evento no banco:", error.message); // Log do erro
        throw error; // Repassa o erro para o controlador
    } finally {
        connect.end();
    }
}

async function updateEvento(cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador, id_evento) {
    const sql = 'UPDATE eventos SET cpf = ?, titulo_evento = ?, descricao_evento = ?, tipo = ?, inicio_evento = ?, fim_evento = ?, cor = ?, status_pagamento = ?, fk_id_morador = ? WHERE id_evento = ?';

    const infoEvento = [cpf, titulo_evento, descricao_evento, tipo, inicio_evento, fim_evento, cor, status_pagamento, fk_id_morador, id_evento];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoEvento);
    connect.end();
}

async function deleteEvento(id_evento) {
    const sql = 'DELETE FROM eventos WHERE id_evento = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_evento]);
    connect.end(); 
}

async function verificarMorador(cpf, id_morador) { // Removido o campo email
    const sql = 'SELECT * FROM moradores WHERE cpf = ? AND id_morador = ?';

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [cpf, id_morador]);
    connect.end();
    return rows.length > 0;
}

export { listEventos, createEvento, updateEvento, deleteEvento, verificarMorador };