import mysql from "../repository/mysql.js";

async function listProprietario() {
    const sql = "SELECT * FROM proprietario WHERE deletado = 0";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        return rows;
    } catch (err) {
        console.error("Erro ao listar Proprietario:", err.message);
        throw new Error("Erro ao acessar o banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

async function CreateProprietario(nome, cpf, data_nascimento,id_genero, email) {
    const sql =
        "INSERT INTO proprietario(nome, cpf, data_nascimento,id_genero, email) VALUES (?, ?, ?, ?, ?)";
    const infoProprietario = [nome, cpf, data_nascimento,id_genero, email];
    let connect;

    try {
        connect = await mysql.bancoDados();
        await connect.query(sql, infoProprietario);
        return { message: "Proprietario criado com sucesso!" };
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            console.error("Erro de chave duplicada:", err.message);
            throw new Error("Erro: CPF ou e-mail já cadastrado.");
        } else {
            console.error("Erro ao criar Proprietario:", err.message);
            throw new Error("Erro ao criar Proprietario no banco de dados.");
        }
    } finally {
        if (connect) connect.end();
    }
}

async function Updateproprietario(nome, cpf, data_nascimento,id_genero, email, id_proprietario) {
    const sql =
        "UPDATE proprietario SET nome = ?, cpf = ?, data_nascimento = ?,id_genero= ?    , email = ? WHERE id_proprietario = ?";
    const infoProprietario = [nome, cpf, data_nascimento,id_genero, email, id_proprietario];
    let connect;

    try {
        connect = await mysql.bancoDados();
        await connect.query(sql, infoProprietario);
        return { message: "proprietario atualizado com sucesso!" };
    } catch (err) {
        console.error("Erro ao atualizar Proprietario:", err.message);
        throw new Error("Erro ao atualizar proprietario no banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}






export default {
    listProprietario,
    CreateProprietario,
    Updateproprietario,
};
