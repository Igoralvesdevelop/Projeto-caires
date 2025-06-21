import mysql from "../repository/mysql.js";

async function listAcesso() {
    const sql = "SELECT * FROM  nivel_Acesso";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        return rows;
    } catch (err) {
        console.error("Erro ao listar Acessos:", err.message);
        throw new Error("Erro ao acessar o banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

export default { listAcesso };