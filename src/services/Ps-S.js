import mysql from "../repository/mysql.js";

async function listPrestadoresCadastrados() {
    const sql = "SELECT * FROM prestadores_servicos_cadastrados WHERE deletado = 0";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createPrestadorCadastrado(nome, cpf, uf) {
    const sql = 'INSERT INTO prestadores_servicos_cadastrados(nome, cpf, uf) VALUES (?, ?, ?)';

    const info = [nome, cpf, uf];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}

async function updatePrestadorCadastrado(nome, cpf, uf, id_prestador_servico) {
    const sql = 'UPDATE prestadores_servicos_cadastrados SET nome = ?, cpf = ?,  uf = ? WHERE id_prestador_servico = ?';

    const info = [nome, cpf, uf, id_prestador_servico];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}

async function deletePrestadorCadastrado(id_prestador_servico) {
    const sql = 'UPDATE prestadores_servicos_cadastrados SET deletado = 1 WHERE id_prestador_servico = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_prestador_servico]);
    connect.end();
}

export default {
    listPrestadoresCadastrados, 
    createPrestadorCadastrado,
    updatePrestadorCadastrado,
    deletePrestadorCadastrado
}
