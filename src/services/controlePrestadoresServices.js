import mysql from "../repository/mysql.js";

async function listPrestadoresServicos() {
    const sql = "SELECT * FROM prestadores_servicos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createPrestadorServico(nome, cpf, uf, apartamento, bloco, fk_id_prestador_servico) {
    const sql = 'INSERT INTO prestadores_servicos(nome, cpf, uf, apartamento, bloco, fk_id_prestador_servico) VALUES (?, ?, ?, ?, ?, ?)';

    const info = [nome, cpf, uf, apartamento, bloco, fk_id_prestador_servico];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}

async function updatePrestadorServico(nome, cpf_rg, uf, apartamento, bloco, data_saida, id_prestador_servico) {
    const sql = 'UPDATE prestadores_servicos SET nome = ?, cpf = ?, uf = ?, apartamento = ?, bloco = ?, data_saida = ? WHERE id_prestador_servico = ?';

    const info = [nome, cpf , uf, apartamento, bloco, data_saida, id_prestador_servico];

    const connect = await mysql.bancoDados();
    await connect.query(sql, info);
    connect.end();
}

async function deletePrestadorServico(id_prestador_servico) {
    const sql = 'DELETE FROM prestadores_servicos WHERE id_prestador_servico = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_prestador_servico]);
    connect.end();
}