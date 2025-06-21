import mysql from "../repository/mysql.js";

async function listVeiculos() {
    const sql = "SELECT * FROM veiculos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createVeiculo(id_veiculo, modelo, placa, cor, tipo_veiculo, vaga, id_cor, id_unidade) {
    const sql = 'INSERT INTO veiculos(id_veiculo, modelo, placa, cor, tipo_veiculo, vaga, id_cor, id_unidade) VALUES (?, ?, ?, ?, ?, ?, ?)';

    const infoVeiculo = [id_veiculo, modelo, placa, cor, tipo_veiculo, vaga, id_cor, id_unidade];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVeiculo);
    connect.end;    
}

async function updateVeiculo(id_veiculo, modelo, placa, cor, tipo_veiculo, vaga, id_cor, id_unidade) {
    const sql = 'UPDATE veiculos SET id_veiculo = ?, modelo = ?, placa = ?, tipo_veiculo = ?, vaga = ?, id_cor = ?,id_unidade = ? WHERE id_veiculo = ?';

    const infoVeiculo = [id_veiculo, modelo, placa, cor, tipo_veiculo, vaga, id_cor, id_unidade];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVeiculo);
    connect.end;
}

async function deleteVeiculo(id_veiculo) {
    const sql = 'DELETE FROM veiculos WHERE id_veiculo = ?';

    const connect = await mysql.bancoDados();
    await connect.query(sql, [id_veiculo]);
    connect.end;
}

export default { listVeiculos, createVeiculo, updateVeiculo, deleteVeiculo };
