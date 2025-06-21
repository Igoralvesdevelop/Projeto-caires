import mysql from "../repository/mysql.js";

async function listVisitantes() {
    const sql = "SELECT * FROM visitantes_cadastrados WHERE data_saida IS NULL AND deletado = 0"; // Adicionada condição para não mostrar excluídos

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createVisitante(nome, cpf, rg, nivel_acesso, permissao, id_genero,  ) {
    const sql = 'INSERT INTO visitantes_cadastrados(nome, cpf, rg, nivel_acesso, permissao, id_genero) VALUES (?, ?, ?, ?, ?, ?,)';

    const infoVisitante = [nome, cpf, rg, nivel_acesso, permissao, id_genero  ];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}

async function updateVisitante(nome, cpf, rg, nivel_acesso, permissao, data_entrada, data_saida, id_genero) {
    const sql = `UPDATE visitantes_cadastrados 
                 SET nome = ?, cpf = ?, rg = ?, nivel_acesso = ?, permissao = ?, id_genero = ?, 
                 WHERE id_visitante = ?`;

    const infoVisitante = [nome, cpf, rg, nivel_acesso, permissao, data_entrada, data_saida, id_genero ];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}

async function deleteVisitante(id_visitante) {
    const sql = 'UPDATE visitantes_cadastrados SET deletado = 1 WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}
async function listCpf(cpf) {
    const sql = 'SELECT * FROM visitantes WHERE cpf = ? AND deletado = 0';

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [cpf]);
    connect.end();
    return rows;
    
}

export default { listVisitantes, createVisitante, updateVisitante, deleteVisitante, listCpf };