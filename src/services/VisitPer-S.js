import mysql from "../repository/mysql.js";

async function listVisitantes() {
    const sql = "SELECT * FROM visitantes WHERE data_saida IS NULL";  // Filtra para não mostrar os que já saíram

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}


async function createVisitante(nome, cpf_rg, uf, apartamento, bloco, fk_id_visitante) {
    const sql = 'INSERT INTO visitantes(nome, cpf_rg, uf, apartamento, bloco, fk_id_visitante) VALUES (?, ?, ?, ?, ?, ?)';

    const infoVisitante = [nome, cpf_rg, uf, apartamento, bloco, fk_id_visitante];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}


async function updateVisitante(nome, cpf_rg, uf, apartamento, bloco, fk_id_visitante, id_visitante) {
    const sql = 'UPDATE visitantes SET nome = ?, cpf_rg = ?, uf = ?, apartamento = ?, bloco = ?, fk_id_visitante = ? WHERE id_visitante = ?';

    const infoVisitante = [nome, cpf_rg, uf, apartamento, bloco, fk_id_visitante, id_visitante];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}

async function updateDataSaida(id_visitante) {
    const sql = 'UPDATE visitantes SET data_saida = CURRENT_TIMESTAMP WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}

async function deleteVisitante(id_visitante) {
    const sql = 'UPDATE visitantes SET deletado = 1 WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}

export default { listVisitantes, createVisitante, updateVisitante, updateDataSaida, deleteVisitante };
