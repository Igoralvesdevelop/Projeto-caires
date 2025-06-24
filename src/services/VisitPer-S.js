import mysql from "../repository/mysql.js";

async function listVisitantes() {
    const sql = "SELECT * FROM visitantes WHERE  deletado = 0"; // Adicionada condição para não mostrar excluídos

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end();
    return rows;
}

async function createVisitante(nome, cpf, rg, nivel_acesso, permissao, id_genero, imagem) {
    const sql = 'INSERT INTO visitantes(nome, cpf, rg, nivel_acesso, permissao, id_genero, imagem) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const infoVisitante = [nome, cpf, rg, nivel_acesso, permissao, id_genero, imagem];

    const connect = await mysql.bancoDados();
    const [result] = await connect.query(sql, infoVisitante);
    connect.end();
    return { id_visitante: result.insertId };
}

async function updateVisitante(nome, cpf, rg, nivel_acesso, permissao, motivo, id_genero, id_visitante) {
    const sql = `UPDATE visitantes 
                 SET nome = ?, cpf = ?, rg = ?, nivel_acesso = ?, permissao = ?, motivo = ?, id_genero = ?
                 WHERE id_visitante = ?`;

    const infoVisitante = [nome, cpf, rg, nivel_acesso, permissao, motivo, id_genero, id_visitante];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVisitante);
    connect.end();
}

async function deleteVisitante(id_visitante) {
    const sql = 'UPDATE visitantes SET deletado = 1 WHERE id_visitante = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_visitante]);
    connect.end();
}
async function listCpf(cpf) {
    const sql = `
        SELECT v.*, mva.id_unidade
        FROM visitantes v
        LEFT JOIN morador_visitante_assoc mva ON v.id_visitante = mva.id_visitante
        WHERE v.cpf = ? AND v.deletado = 0
    `;

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [cpf]);
    connect.end();
    return rows;
}

async function getVisitanteById(id_visitante) {
    const sql = "SELECT * FROM visitantes WHERE id_visitante = ? AND deletado = 0";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [id_visitante]);
    connect.end();
    return rows[0]; // retorna apenas um visitante
}

// Adicione ao export default:
export default { 
    listVisitantes, 
    createVisitante, 
    updateVisitante, 
    deleteVisitante, 
    listCpf,
    getVisitanteById // <-- novo
};