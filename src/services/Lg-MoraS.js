import mysql from "../repository/mysql.js";

async function login(email, senha) {
    const sql = 'SELECT * FROM morador WHERE email = ? AND senha = ?;';
    const datalogin = [email, senha];

    const conn = await mysql.bancoDados();
    const [rows] = await conn.query(sql, datalogin);
    conn.end();
    return rows;
};

async function checkEmail(email) {
    const sql = 'SELECT * FROM morador WHERE email = ?';

    const conn = await mysql.bancoDados();
    const [rows] = await conn.query(sql, [email]);
    conn.end();

    return rows;
}

async function changePassword(email, newPassword) {
    const sql = 'UPDATE morador SET senha = ? WHERE email = ?';
    const dataNewPass = [newPassword, email];

    const conn = await mysql.bancoDados();
    await conn.query(sql, dataNewPass);
    conn.end();
}

// Função para buscar id_morador pelo id_usuario
async function getMoradorByUsuario(email) {
    const sql = 'SELECT id_morador FROM morador WHERE email = ?';
    const conn = await mysql.bancoDados();
    const [rows] = await conn.query(sql, [email]);
    conn.end();
    return rows[0] || null;
}

export default { login, checkEmail, changePassword, getMoradorByUsuario };
