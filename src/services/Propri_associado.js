import mysql from "../repository/mysql.js";

async function ListAssociacaoProprietarios() {
    const sql = "SELECT * FROM  proprietario_unidade_assoc  WHERE deletado = 0";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createAssociacaoProprietario(id_proprietario, id_unidade, status_ocupacao) {
    const sql = 'INSERT INTO  proprietario_unidade_assoc (id_proprietario, id_unidade, status_ocupacao) VALUES (?, ?, ?)';

    const info = [id_proprietario, id_unidade, status_ocupacao];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}

async function UpdateAssociacaoProprietario(id_proprietario, id_unidade, status_ocupacao) {
    const sql = 'UPDATE  proprietario_unidade_assoc SET id_proprietario = ?, id_unidade = ?, status_ocupacao = ? WHERE id_proprietario = ?';

    const info = [id_proprietario, id_unidade, status_ocupacao];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}
export default {
    ListAssociacaoProprietarios,
    createAssociacaoProprietario,
    UpdateAssociacaoProprietario
}
