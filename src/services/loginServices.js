//Importando banco de dados
import mysql from "../repository/mysql";

//Criando função assíncrona para login
async function login(email, password) {
    //Variável para inserir informações no banco de dados
    const sql = 'SELECT * FROM tbl_usuario WHERE email = ? AND senha;';
    //Variável solicitando informações do usuário
    const dataLogin = [email, password];
    //Variável para esperar o banco de dados conectar primeiro
    const connect = await mysql.bancoDados();
    //Variável para quando conectar o banco de dados, ele inserir dados
    const [rows] = await connect.query(sql, dataLogin);

    return rows[0];
};

export default {login};