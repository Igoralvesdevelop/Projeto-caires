import mysql from "../repository/mysql.js";

async function listAreas() {
    const sql = "SELECT * FROM  areas_comuns";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        return rows;
    } catch (err) {
        console.error("Erro ao listar áreas:", err.message);
        throw new Error("Erro ao acessar o banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

export default { listAreas };