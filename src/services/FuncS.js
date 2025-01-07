//Importando banco de dados
import mysql from "../repository/mysql.js";

async function listUsuario() {
      
        const sql = "SELECT * FROM usuarios WHERE deletado = 0"

        const connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        connect.end;
        return rows
}
async function CreateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso) {
        const sql = 'INSERT INTO usuarios(nome, email, cpf, senha, telefone, data_nascimento, genero, nivel_acesso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'

        const infoUser = [nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso];

        const connect = await mysql.bancoDados();
        await connect.query(sql, infoUser);
        connect.end;
}
async function UpdateUsuario(nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario) {
        const sql = 'UPDATE usuarios SET nome = ?, email = ?, cpf = ?, senha = ?, telefone = ?, data_nascimento = ?, genero = ?, nivel_acesso = ? WHERE id_usuario = ?';

        const infoUser = [nome, email, cpf, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario];

        const connect = await mysql.bancoDados();
        await connect.query(sql, infoUser);
        connect.end;
}
async function DeleteUsuario(id_usuario) {
        const sql = 'UPDATE usuarios SET deletado = 1 WHERE id_usuario = ?';

        const connect = await mysql.bancoDados();
        await connect.query(sql, id_usuario);
        connect.end;
        
}
export default {CreateUsuario, UpdateUsuario, DeleteUsuario, listUsuario};