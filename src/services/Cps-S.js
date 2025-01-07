import mysql from "../repository/mysql.js";

async function listControlePrestadores() {
    const sql = "SELECT * FROM controle_prestadores";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createControlePrestador(nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico) {
    const sql = 'INSERT INTO controle_prestadores(nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const infoPrestador = [nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoPrestador);
    connect.end;
}

async function updateControlePrestador(nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico, id_prestador_servico) {
    const sql = 'UPDATE controle_prestadores SET nome = ?, cpf = ?, uf = ?, apartamento = ?, bloco = ?, data_entrada = ?, data_saida = ?, fk_id_prestador_servico = ? WHERE id_prestador_servico = ?';

    const infoPrestador = [nome, cpf, uf, apartamento, bloco, data_entrada, data_saida, fk_id_prestador_servico, id_prestador_servico];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoPrestador);
    connect.end;
}

async function deleteControlePrestador(id_prestador_servico) {
    const sql = 'DELETE FROM controle_prestadores WHERE id_prestador_servico = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_prestador_servico]);
    connect.end;
}

export default { listControlePrestadores, createControlePrestador, updateControlePrestador, deleteControlePrestador };
