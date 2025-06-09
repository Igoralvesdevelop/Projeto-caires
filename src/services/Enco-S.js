import mysql from "../repository/mysql.js";

async function listEncomendas() {
    const sql = "SELECT * FROM encomendas";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createEncomenda(empresa,  fk_id_morador, status_entrega, imagem) {
    const sql = 'INSERT INTO encomendas(empresa, fk_id_morador, status_entrega, imagem) VALUES ( ?, ?, ?, ?)';
    const infoEncomenda = [empresa,  fk_id_morador, status_entrega, imagem];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoEncomenda);
    connect.end;
}

async function updateEncomenda(empresa, data_entrega, fk_id_morador, status_entrega, id_encomenda) {
    const sql = 'UPDATE encomendas SET empresa = ?, data_entrega = ?, fk_id_morador = ?, status_entrega = ? WHERE id_encomenda = ?';

    const infoEncomenda = [empresa, data_entrega, fk_id_morador, status_entrega, id_encomenda];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoEncomenda);
    connect.end;
}

async function deleteEncomenda(id_encomenda) {
    const sql = 'DELETE FROM encomendas WHERE id_encomenda = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_encomenda]);
    connect.end;
}

export default { listEncomendas, createEncomenda, updateEncomenda, deleteEncomenda };
