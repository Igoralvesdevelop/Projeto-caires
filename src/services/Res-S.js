import mysql from "../repository/mysql.js";

async function listresidencia() {
    const sql = "SELECT * FROM unidades_residenciais";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createResidencia(id_unidade, bloco, apartamento, andar) {
    const sql = 'INSERT INTO unidades_residenciais(id_unidade, bloco, apartamento, andar) VALUES (?, ?, ?, ?)';

    const infoResidencias = [id_unidade, bloco, apartamento, andar];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoResidencias);
    connect.end;    
}

async function deleteResindencias(id_unidade) {
    const sql = 'DELETE FROM unidades_residenciais WHERE id_unidade = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_unidade]);
    connect.end;
}

export default { listresidencia, createResidencia, deleteResindencias };
