import mysql from "../repository/mysql.js";

async function listCond() {

    const sql = "SELECT * FROM condominio";
    
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    await connect.end();
    return rows;
}

async function createCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj) {

    const cnpjLimpo = cnpj.replace(/[.\-/]/g, '');

    const sql = 'INSERT INTO condominio (nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    const infoCondominio = [nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpjLimpo];
    const connect = await mysql.bancoDados();
    const [result] = await connect.query(sql, infoCondominio);
    await connect.end();
    return { id_condominio: result.insertId };
}

async function updateCondominio(nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj, id_condominio) {
    
    const cnpjLimpo = cnpj.replace(/[.\-/]/g, '');
    
    const sql = 'UPDATE condominio SET nome = ?, numero_bloco = ?, numero_unidades = ?, ramal = ?, cep = ?, endereco = ?, cnpj = ? WHERE id_condominio = ?';
    
    const infoCondominio = [nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpjLimpo, id_condominio];
    const connect = await mysql.bancoDados();
    await connect.query(sql, infoCondominio);
    await connect.end();
}

async function deleteCondominio(id_condominio) {
    
    const sql = 'DELETE FROM condominio WHERE id_condominio = ?';
    
    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_condominio]);
    await connect.end();
}

export default { listCond, createCondominio, updateCondominio, deleteCondominio };
