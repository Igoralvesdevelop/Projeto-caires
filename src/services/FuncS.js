    import mysql from "../repository/mysql.js";

    async function listUsuario() {
        const sql = "SELECT * FROM usuarios WHERE deletado = 0";
        const connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql);
        connect.end(); 
        return rows;
    }

    async function emailExists(email) {
        const sql = "SELECT COUNT(*) as count FROM usuarios WHERE email = ? AND deletado = 0";
        const connect = await mysql.bancoDados();
        const [rows] = await connect.query(sql, [email]);
        connect.end(); 
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
        baseEmail += "@caires.com";
        return baseEmail;
    }

    function formatarDataParaMySQL(data) {
        if (!data) return null;
        // Se já estiver no formato YYYY-MM-DD, retorna direto
        if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
        // Se estiver no formato DD/MM/YYYY, converte
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
            const [dia, mes, ano] = data.split("/");
            return `${ano}-${mes}-${dia}`;
        }
        // Se não for nenhum dos formatos, retorna null
        return null;
    }

    async function CreateUsuario(nome, cpf, senha, data_nascimento, id_genero, nivel_acesso, id_condominio, id_nivel) {
        cpf = cpf ? cpf.replace(/\D/g, "") : null;
        if (data_nascimento) {
            data_nascimento = formatarDataParaMySQL(data_nascimento);
        }
        let email = generateEmail(nome);
        let counter = 1;
        while (await emailExists(email)) {
            email = generateEmail(nome, counter);
            counter++;
        }
        const sql =
            "INSERT INTO usuarios(nome, email, cpf, senha, data_nascimento, id_genero, nivel_acesso, id_condominio, id_nivel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const infoUser = [nome, email, cpf, senha, data_nascimento, id_genero, nivel_acesso, id_condominio, id_nivel];
        const connect = await mysql.bancoDados();
        await connect.query(sql, infoUser);
        connect.end();
    }

    async function UpdateUsuario(nome, email, cpf, data_nascimento, id_genero, nivel_acesso, id_condominio, id_usuario) {
        cpf = cpf ? cpf.replace(/\D/g, "") : null;
        if (data_nascimento) {
            data_nascimento = formatarDataParaMySQL(data_nascimento);
        }
        const sql =
            "UPDATE usuarios SET nome = ?, email = ?, cpf = ?, data_nascimento = ?, id_genero = ?, nivel_acesso = ?, id_condominio = ? WHERE id_usuario = ?";
        const infoUser = [nome, email, cpf, data_nascimento, id_genero, nivel_acesso, id_condominio, id_usuario];
        const connect = await mysql.bancoDados();
        await connect.query(sql, infoUser);
        connect.end();
    }

    async function DeleteUsuario(id_usuario, id_condominio) {
        const sql = "UPDATE usuarios SET deletado = 1 WHERE id_usuario = ? AND id_condominio = ?";
        const connect = await mysql.bancoDados();
        await connect.query(sql, [id_usuario, id_condominio]); 
        connect.end(); 
    }

    export default { CreateUsuario, UpdateUsuario, DeleteUsuario, listUsuario };
