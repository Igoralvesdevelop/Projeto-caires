import mysql from "mysql2/promise";

async function bancoDados(){
    return await mysql.createConnection({
        "password":"Xenover$e1",
        "host":"localhost",
        "user":"root",
        "port": 3306,
        "database":"controle_de_acesso"
        })
}
export default {bancoDados}