import mysql from "../repository/mysql.js";

async function listCond() {
    const sql = "SELECT * FROM condominio";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, email) {
    const id_condominio = Math.floor(100000 + Math.random() * 900000);

    // Remove pontos, traços e barras do CNPJ
    const cnpjLimpo = cnpj.replace(/[.\-/]/g, '');

    const sql = 'INSERT INTO condominio(id_condominio, nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const infoCondominio = [id_condominio, nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpjLimpo, email];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoCondominio);
    connect.end;

    return {id_condominio}
}

async function updateCondominio(nome,numero_bloco, numero_unidades, ramal, cep,endereco, cnpj) {
    const sql = 'UPDATE condominio SET nome=? ,numero_bloco = ?, numero_unidades = ?, ramal = ?, cep = ?,endereco = ?, cnpj = ? WHERE id_condominio = ?';

    const infoCondominio = [nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoCondominio);
    connect.end;
}

async function deleteCondominio(id_condominio) {
    const sql = 'DELETE FROM condominio WHERE id_condominio = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_condominio]);
    connect.end;
}

export default { listCond, createCondominio, updateCondominio, deleteCondominio };
