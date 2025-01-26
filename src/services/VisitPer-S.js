import mysql from "../repository/mysql.js";

async function listVisitantes() {
    const sql = "SELECT * FROM visitantes WHERE data_saida IS NULL";  // Filtra para não mostrar os que já saíram

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}


async function createVisitante(nome, cpf, rg, uf,nivel_acesso, apartamento, bloco, data_entrada , data_saida, fk_id_morador) {
    const sql = 'INSERT INTO visitantes_cadastrados(nome, cpf, rg, uf, nivel_acesso, apartamento, bloco,data_entrada,  data_saida, fk_id_morador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const infoVisitante = [nome, cpf, rg, uf, nivel_acesso, apartamento, bloco, data_entrada, data_saida, fk_id_morador];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}


async function updateVisitante(nome, cpf, rg, uf,nivel_acesso, apartamento, bloco, data_entrada , data_saida, fk_id_morador) {
    const sql = 'UPDATE visitantes_cadastrados SET nome = ?, cpf = ?, rg = ?, uf = ?, nivel_acesso = ? apartamento = ?, bloco = ?, data_entrada = ?, data_saida, fk_id_morador= ?  WHERE id_visitante = ?';

    const infoVisitante = [nome, cpf, rg, uf,nivel_acesso, apartamento, bloco, data_entrada , data_saida, fk_id_morador];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}

async function updateDataSaida(id_visitante) {
    const sql = 'UPDATE visitantes_cadastrados SET data_saida = CURRENT_TIMESTAMP WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}

async function deleteVisitante(id_visitante) {
    const sql = 'UPDATE visitantes_cadastrados SET deletado = 1 WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}

export default { listVisitantes, createVisitante, updateVisitante, updateDataSaida, deleteVisitante };
