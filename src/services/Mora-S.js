import mysql from "../repository/mysql.js";

async function listMorador() {
    const sql = "SELECT * FROM moradores WHERE deletado = 0";
    let connect;

    try {
        connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        return rows;
    } catch (err) {
        console.error("Erro ao listar moradores:", err.message);
        throw new Error("Erro ao acessar o banco de dados.");
    } finally {
        if (connect) connect.end(); 
    }
}

async function CreateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal) {
    const sql =
        "INSERT INTO moradores(nome, cpf, telefone, genero, data_nascimento, apartamento, bloco, senha, email, ramal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const infoMorador = [nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal];
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

async function UpdateMorador(nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal, id_morador) {
    const sql =
        "UPDATE moradores SET nome = ?, cpf = ?, telefone = ?, genero = ?, data_nascimento = ?, apartamento = ?, bloco = ?, senha = ?, email = ?, ramal = ? WHERE id_morador = ?";
    const infoMorador = [nome, cpf, telefone, genero, dt_nascimento, apartamento, bloco, senha, email, ramal, id_morador];
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

async function DeleteMoradores(id_morador) {
    const sql = "UPDATE moradores SET deletado = 1 WHERE id_morador = ?";
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

export default { CreateMorador, UpdateMorador, DeleteMoradores, listMorador };
