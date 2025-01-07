import mysql from "../repository/mysql.js";

async function listVeiculos() {
    const sql = "SELECT * FROM veiculos";

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query(sql);
    connect.end;
    return rows;
}

async function createVeiculo(modelo, placa, cor, tipo, fk_id_morador) {
    const sql = 'INSERT INTO veiculos(modelo, placa, cor, tipo, fk_id_morador) VALUES (?, ?, ?, ?, ?)';

    const infoVeiculo = [modelo, placa, cor, tipo, fk_id_morador];

    const connect = await mysql.bancoDados();
    await connect.query(sql, infoVeiculo);
    connect.end;
}

async function updateVeiculo(modelo, placa, cor, tipo, fk_id_morador, id_veiculo) {
    const sql = 'UPDATE veiculos SET modelo = ?, placa = ?, cor = ?, tipo = ?, fk_id_morador = ? WHERE id_veiculo = ?';

    const infoVeiculo = [modelo, placa, cor, tipo, fk_id_morador, id_veiculo];

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
