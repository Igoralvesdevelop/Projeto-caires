import mysql from "../repository/mysql.js";

async function login(email, senha) {
    const sql = 'SELECT * FROM moradores WHERE email = ? AND senha = ?;';
    const datalogin = [email, senha];

    const conn = await mysql.bancoDados();
    const [rows] = await conn.query(sql, datalogin);
    conn.end();
    return rows;
};

async function checkEmail(email) {
    const sql = 'SELECT * FROM moradores WHERE email = ?';

    const conn = await mysql.bancoDados();
    const [rows] = await conn.query(sql, [email]);
    conn.end();

    return rows;
}

async function changePassword(email, newPassword) {
    const sql = 'UPDATE moradores SET senha = ? WHERE email = ?';
    const dataNewPass = [newPassword, email];

    const conn = await mysql.bancoDados();
    await conn.query(sql, dataNewPass);
    conn.end();
}

export default { login, checkEmail, changePassword };
