import mysql from "../repository/mysql.js";

async function listUsuario() {
    const sql = "SELECT * FROM usuarios WHERE deletado = 0";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end(); // Garante fechamento da conexão
    return rows;
}

async function emailExists(email) {
    const sql = "SELECT COUNT(*) as count FROM usuarios WHERE email = ? AND deletado = 0";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [email]);
    connect.end(); // Garante fechamento da conexão
    return rows[0].count > 0;
}

function generateEmail(nome, counter = 0) {
    let baseEmail = nome
        .toLowerCase()
        .replace(/\s+/g, ".")
        .normalize("NFD")
        .replace(/[^a-zA-Z.]/g, "");
    if (counter > 0) {
        baseEmail += counter;
    }
    baseEmail += "@empresa.com";
    return baseEmail;
}

async function CreateUsuario(nome, cpf, cnpj = null, senha, telefone, dt_nascimento, genero, nivel_acesso) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos do CPF
    if (cnpj) {
        cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos do CNPJ, se fornecido
    }

    let email = generateEmail(nome);
    let counter = 1;

    while (await emailExists(email)) {
        email = generateEmail(nome, counter);  
        counter++;
    }

    const sql =
        "INSERT INTO usuarios(nome, email, cpf, cnpj, senha, telefone, data_nascimento, genero, nivel_acesso) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const infoUser = [nome, email, cpf, cnpj, senha, telefone, dt_nascimento, genero, nivel_acesso];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoUser);
    connect.end(); // Garante fechamento da conexão
}

async function UpdateUsuario(nome, email, cpf, cnpj = null, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario) {
    cpf = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos do CPF
    if (cnpj) {
        cnpj = cnpj.replace(/\D/g, ""); // Remove caracteres não numéricos do CNPJ, se fornecido
    }

    const sql =
        "UPDATE usuarios SET nome = ?, email = ?, cpf = ?, cnpj = ?, senha = ?, telefone = ?, data_nascimento = ?, genero = ?, nivel_acesso = ? WHERE id_usuario = ?";
    const infoUser = [nome, email, cpf, cnpj, senha, telefone, dt_nascimento, genero, nivel_acesso, id_usuario];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoUser);
    connect.end(); // Garante fechamento da conexão
}

async function DeleteUsuario(id_usuario) {
    const sql = "UPDATE usuarios SET deletado = 1 WHERE id_usuario = ?";
    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_usuario]); // Corrigido para usar array no parâmetro
    connect.end(); // Garante fechamento da conexão
}

export default { CreateUsuario, UpdateUsuario, DeleteUsuario, listUsuario };
