import mysql from "../repository/mysql.js";

async function listMorador() {
      
        const sql = "SELECT * FROM moradores WHERE deletado = 0"

        const connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        connect.end;
        return rows
}
async function CreateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal) {
        const sql = 'INSERT INTO moradores(nome, cpf, telefone, genero, data_nascimento, apartamento , bloco, senha, email, ramal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

        const infoMorador = [nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal];

        const connect = await mysql.bancoDados();
        await connect.query(sql, infoMorador);
        connect.end;
}
async function UpdateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal, id_morador) {
        const sql = 'UPDATE moradores SET nome = ?, cpf = ?, telefone = ?, genero = ?, data_nascimento = ?, apartamento = ?, bloco = ?, senha = ?, email = ?, ramal = ? WHERE id_morador = ?';

        const infoMorador = [nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal, id_morador];

        const connect = await mysql.bancoDados();
        await connect.query(sql, infoMorador);
        connect.end;
}
async function DeleteMoradores(id_morador) {
        const sql = 'UPDATE moradores SET deletado = 1 WHERE id_morador = ?';

        const connect = await mysql.bancoDados();
        await connect.query(sql, id_morador);
        connect.end;
        
}
export default {CreateMorador, UpdateMorador, DeleteMoradores, listMorador};