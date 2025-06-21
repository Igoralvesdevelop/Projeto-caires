import express from "express";
import db from "../services/Lg-FuncS.js";
import jwt from "jsonwebtoken";
import { generatePassword } from "../helpers/loginactions.js";

const router = express.Router();
const secret = process.env.JWT_SECRET || 'Senh@CrIpTOgr@FaaDA!?';

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const users = await db.login(email, senha);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const usuario = users[0];
        const tipo = usuario.nivel_acesso; // ou outro campo que represente o tipo

        // Gera token JWT com id e tipo
        const token = jwt.sign(
            { id: usuario.id_usuario, tipo },
            secret,
            { expiresIn: '5h' }
        );
        
        res.json({ token, tipo });
    } catch (err) {
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
            res.status(404).send({ message: 'Usuario não encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: `Houve um erro no banco de dados. ${err}` });
    }
});

export default router;