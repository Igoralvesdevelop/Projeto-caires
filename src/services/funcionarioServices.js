//Importando banco de dados
import mysql from "../repository/mysql.js";


async function CreateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero, imagem_usuario, nivel_acesso) {
        const sql = 'INSERT INTO usuarios(nome, email, cpf, senha, telefone, data_nascimento, genero, imagem_usuario, nivel_acesso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

        const infoUser = [nome, email, cpf, senha, telefone, dt_nascimento, genero, imagem_usuario, nivel_acesso];

        const connect = await mysql.bancoDados();
        await connect.query(sql, infoUser);
        connect.end;
}
export default {CreateUsuario};