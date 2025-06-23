import mysql from "../repository/mysql.js";

async function ListAssociacaoVisitantes() {
    const sql = "SELECT * FROM morador_visitante_assoc";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createAssociacaoVisitante(id_visitante, id_unidade) {
    const sql = 'INSERT INTO  morador_visitante_assoc(id_visitante, id_unidade) VALUES (?, ?)';

    const info = [id_visitante, id_unidade];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}


async function UpdateAssociacaoVisitante(id_visitante, id_unidade) {
    const sql = 'UPDATE  morador_visitante_assoc SET id_visitante = ?, id_unidade = ? WHERE id_visitante = ?';

    const info = [id_visitante, id_unidade];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}
export default {
    ListAssociacaoVisitantes,
    createAssociacaoVisitante,
    UpdateAssociacaoVisitante
}
