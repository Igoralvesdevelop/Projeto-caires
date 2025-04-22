import mysql from "../repository/mysql.js";

async function gerarRelatorioMoradores() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('SELECT * FROM moradores WHERE deletado = false');
        return rows;
    } finally {
        await connection.end();
    }
}

async function gerarRelatorioVisitantes() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('SELECT * FROM visitantes_cadastrados WHERE deletado = false');
        return rows;
    } finally {
        await connection.end();
    }
}

async function gerarRelatorioEventos() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('SELECT * FROM eventos');
        return rows;
    } finally {
        await connection.end();
    }
}

async function gerarRelatorioVeiculos() {
    const connection = await mysql.createConnection(dbConfig);
    try {
        const [rows] = await connection.execute('SELECT * FROM veiculos');
        return rows;
    } finally {
        await connection.end();
    }
}

export default {
    gerarRelatorioMoradores,
    gerarRelatorioVisitantes,
    gerarRelatorioEventos,
    gerarRelatorioVeiculos,
};
