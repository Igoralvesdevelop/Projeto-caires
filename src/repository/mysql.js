import mysql from "mysql2/promise";

async function bancoDados(){
    return await mysql.createConnection({
        "host":"localhost",
        "user":"root",
        "password":"KKKsaik0",
        "port": 3306,
        "database":"controle_de_acesso"
        })
}
export default {bancoDados}
