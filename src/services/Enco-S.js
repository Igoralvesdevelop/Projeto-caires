import mysql from "../repository/mysql.js";

async function listEncomendas() {
    const sql = "SELECT * FROM encomendas";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    await connect.end();
    return rows;
}

async function getEncomendaById(id_encomenda) {
    const sql = "SELECT * FROM encomendas WHERE id_encomenda = ?";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [id_encomenda]);
    await connect.end();
    return rows[0]; // Retorna o primeiro registro ou undefined
}

async function createEncomenda(empresa, id_unidade, status_entrega, imagem, data_entrega = null) {
    const sql = `
        INSERT INTO encomendas (empresa, id_unidade, status_entrega, imagem, data_entrega)
        VALUES (?, ?, ?, ?, ?)
    `;

    const params = [empresa, id_unidade, status_entrega, imagem, data_entrega];

    const connect = await mysql.bancoDados();
    const [result] = await connect.query(sql, params);
    await connect.end();

    return { id_encomenda: result.insertId };
}

async function updateEncomenda(empresa, id_unidade, status_entrega, imagem, data_entrega = null, id_encomenda) {
    // Se imagem for null, não atualiza a imagem
    let sql;
    let params;

    if (imagem) {
        sql = `
            UPDATE encomendas
            SET empresa = ?, id_unidade = ?, status_entrega = ?, imagem = ?, data_entrega = ?
            WHERE id_encomenda = ?
        `;
        params = [empresa, id_unidade, status_entrega, imagem, data_entrega, id_encomenda];
    } else {
        sql = `
            UPDATE encomendas
            SET empresa = ?, id_unidade = ?, status_entrega = ?, data_entrega = ?
            WHERE id_encomenda = ?
        `;
        params = [empresa, id_unidade, status_entrega, data_entrega, id_encomenda];
    }

    const connect = await mysql.bancoDados();
    await connect.query(sql, params);
    await connect.end();
}

async function deleteEncomenda(id_encomenda) {
    const sql = 'DELETE FROM encomendas WHERE id_encomenda = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_encomenda]);
    await connect.end();
}

export default {listEncomendas, getEncomendaById, createEncomenda, updateEncomenda, deleteEncomenda};
