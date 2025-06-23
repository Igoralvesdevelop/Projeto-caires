import mysql from "../repository/mysql.js";

async function listMorador() {
    const sql = "SELECT * FROM morador WHERE deletado = 0";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        return rows;
    } catch (err) {
        console.error("Erro ao listar morador:", err.message);
        throw new Error("Erro ao acessar o banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

async function CreateMorador(nome, cpf, senha, id_genero, data_nascimento, email, id_unidade) {
    const id_morador = Math.floor(100000 + Math.random() * 900000);

    const sql =
        "INSERT INTO morador(id_morador, nome, cpf, senha, id_genero, data_nascimento, email, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const infoMorador = [id_morador, nome, cpf, senha, id_genero, data_nascimento, email, id_unidade];
    let connect;

    try {
        connect = await mysql.bancoDados();
        await connect.query(sql, infoMorador);
        return { message: "Morador criado com sucesso!" };
    } catch (err) {
        if (err.code === "ER_DUP_ENTRY") {
            console.error("Erro de chave duplicada:", err.message);
            throw new Error("Erro: CPF ou e-mail já cadastrado.");
        } else {
            console.error("Erro ao criar morador:", err.message);
            throw new Error("Erro ao criar morador no banco de dados.");
        }
    } finally {
        if (connect) connect.end();
    }
}

async function UpdateMorador(nome, cpf, id_genero, data_nascimento, email, id_morador, senha) {
    const sql =
        "UPDATE morador SET nome = ?, cpf = ?, senha = ?, id_genero = ?, data_nascimento = ?, email = ?, id_unidade = ? WHERE id_morador = ?";
    const infoMorador = [nome, cpf, senha, id_genero, data_nascimento, email, id_unidade, id_morador];
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [result] = await connect.query(sql, infoMorador);
        if (result.affectedRows === 0) {
            throw new Error("Nenhum morador encontrado com o ID informado.");
        }
        return { message: "Morador atualizado com sucesso!" };
    } catch (err) {
        console.error("Erro ao atualizar morador:", err.message);
        throw new Error("Erro ao atualizar morador no banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

async function Deletemorador(id_morador) {
    const sql = "UPDATE morador SET deletado = 1 WHERE id_morador = ?";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [result] = await connect.query(sql, [id_morador]);
        if (result.affectedRows === 0) {
            throw new Error("Nenhum morador encontrado com o ID informado.");
        }
        return { message: "Morador deletado com sucesso!" };
    } catch (err) {
        console.error("Erro ao deletar morador:", err.message);
        throw new Error("Erro ao deletar morador no banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

async function getMoradorById(id_morador) {
    const sql = "SELECT * FROM morador WHERE id_morador = ?";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [id_morador]);
    connect.end;
    return rows[0];
}

export default { CreateMorador, UpdateMorador, Deletemorador, listMorador, getMoradorById };
