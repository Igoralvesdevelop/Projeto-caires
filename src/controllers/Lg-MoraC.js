import express from "express";
import db from "../services/Lg-MoraS.js";
import { generatePassword } from "../helpers/loginactions.js";
import { generateToken } from "../helpers/userfeatures.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const users = await db.login(email, senha); 

        if (users.length > 0) {
            const { id_usuario, nome } = users[0]; 
            const token = generateToken(id_usuario, nome);
            res.status(200).send({ message: token });
        } else {
            res.status(404).send({ message: 'Login incorreto' });
        }
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
            res.status(404).send({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).send({ message: `Houve um erro no banco de dados. ${err}` });
    }
});

export default router;
