import mysql from "../repository/mysql.js";

async function listVisitantes() {
    const sql = "SELECT * FROM visitantes_cadastrados WHERE deletado = 0";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createVisitante(nome, cpf, rg, uf) {
    const sql = 'INSERT INTO visitantes_cadastrados(nome, cpf, rg, uf) VALUES (?, ?, ?, ?)';

    const infoVisitante = [nome, cpf, rg, uf];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end;
}

async function updateVisitante(nome, cpf, rg, uf, id_visitante) {
    const sql = 'UPDATE visitantes_cadastrados SET nome = ?, cpf = ?, rg = ?, uf = ? WHERE id_visitante = ?';

    const infoVisitante = [nome, cpf, rg, uf, id_visitante];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end;
}

async function deleteVisitante(id_visitante) {
    const sql = 'UPDATE visitantes_cadastrados SET deletado = 1 WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end;
}

export default { listVisitantes, createVisitante, updateVisitante, deleteVisitante };
