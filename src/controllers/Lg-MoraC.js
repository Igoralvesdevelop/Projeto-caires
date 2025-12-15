import express from "express";
import db from "../services/Lg-MoraS.js";
import { generatePassword } from "../helpers/loginactions.js";
import { generateToken } from "../helpers/userfeatures.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const users = await db.login(email, senha); 

        if (users && users.length > 0) {
            const { id_usuario, nome } = users[0]; 
            const token = generateToken(id_usuario, nome);

            // Busca o id_morador e id_unidade relacionado ao email autenticado
            const conn = await db.getConnection ? await db.getConnection() : await (await import("../repository/mysql.js")).default.bancoDados();
            const [moradorRows] = await conn.query(
                'SELECT id_morador, id_unidade FROM morador WHERE email = ?',
                [email]
            );
            await conn.end();

            res.status(200).send({ 
                message: token, 
                id_morador: moradorRows[0] ? moradorRows[0].id_morador : null,
                id_unidade: moradorRows[0] ? moradorRows[0].id_unidade : null,
                nome: nome
            });
        } else {
            res.status(404).send({ message: 'Login incorreto' });
        }
    } catch (err) {
        console.error("Erro no loginMorador:", err);
        res.status(500).send({ message: `Houve um erro no banco de dados. ${err}` });
    }
});

router.post('/reset', async (req, res) => {
    const { email } = req.body;

    try {
        const users = await db.checkEmail(email);

        if (users.length > 0) {
            const newPassword = generatePassword();
            await db.changePassword(email, newPassword);
            res.status(200).send({ message: `Nova senha ${newPassword}` });
        } else {
            res.status(404).send({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: `Houve um erro no banco de dados. ${err}` });
    }
});

export default router;
