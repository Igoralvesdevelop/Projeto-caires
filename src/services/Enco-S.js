import mysql from "../repository/mysql.js";

async function listEncomendas() {
    const sql = "SELECT * FROM encomendas";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    await connect.end();
    return rows;
}

async function getEncomendaById(id_encomenda) {
    const sql = "SELECT * FROM encomendas WHERE id_encomenda = ?";
    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql, [id_encomenda]);
    await connect.end();
    return rows[0];
}

async function createEncomenda(empresa, id_unidade, status_entrega = undefined, imagem = null, ) {
    // Monta dinamicamente os campos e valores para respeitar os defaults do banco
    let campos = ['empresa', 'id_unidade'];
    let valores = [empresa, id_unidade];
    let placeholders = ['?', '?'];

    if (typeof status_entrega !== 'undefined') {
        campos.push('status_entrega');
        valores.push(status_entrega);
        placeholders.push('?');
    }
    if (imagem !== null) {
        campos.push('imagem');
        valores.push(imagem);
        placeholders.push('?');
    }
  
    const sql = `
        INSERT INTO encomendas (${campos.join(', ')})
        VALUES (${placeholders.join(', ')})
    `;

    const connect = await mysql.bancoDados();
    const [result] = await connect.query(sql, valores);
    await connect.end();

    return { id_encomenda: result.insertId };
}

async function updateEncomenda(empresa, id_unidade, status_entrega = undefined, imagem = undefined, data_entrega = undefined, id_encomenda) {
    // Monta dinamicamente os campos a serem atualizados
    let sets = [];
    let valores = [];

    if (typeof empresa !== 'undefined') {
        sets.push('empresa = ?');
        valores.push(empresa);
    }
    if (typeof id_unidade !== 'undefined') {
        sets.push('id_unidade = ?');
        valores.push(id_unidade);
    }
    if (typeof status_entrega !== 'undefined') {
        sets.push('status_entrega = ?');
        valores.push(status_entrega);
    }
    if (typeof imagem !== 'undefined') {
        sets.push('imagem = ?');
        valores.push(imagem);
    }
    if (typeof data_entrega !== 'undefined') {
        sets.push('data_entrega = ?');
        valores.push(data_entrega);
    }

    if (sets.length === 0) return; // Nada para atualizar

    const sql = `
        UPDATE encomendas
        SET ${sets.join(', ')}
        WHERE id_encomenda = ?
    `;
    valores.push(id_encomenda);

    const connect = await mysql.bancoDados();
    await connect.query(sql, valores);
    await connect.end();
}

async function deleteEncomenda(id_encomenda) {
    const sql = 'DELETE FROM encomendas WHERE id_encomenda = ?';
    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_encomenda]);
    await connect.end();
}

export default {listEncomendas, getEncomendaById, createEncomenda, updateEncomenda, deleteEncomenda};
