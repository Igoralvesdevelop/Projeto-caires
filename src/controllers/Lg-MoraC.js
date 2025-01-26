import express from "express";
import db from "../services/Lg-MoraS.js"
import { generatePassword } from "../helpers/loginactions.js";
import { generateToken } from "../helpers/userfeatures.js";

const router = express.Router();

router.post('/', async (req, res) =>{

    const {senha, email} = req.body;

    try{

        const users = await db.login(senha,email);
       
        const {id_usuario, nome} = users[0]

        if(users.length > 0 ){
            const token = generateToken(id_usuario, nome)
            res.status(200).send({message: token});
        } else {
            res.status(404).send({message: 'Login incorreto'});
        }
    }catch(err){
        res.status(500).send({message: `Houve um erro no bancos de dados.${err}`});
    }
});

router.post('/reset', async (req, res) =>{

    const {email} = req.body;

    try{

        const users = await db.checkEmail(email);

        if(users.length > 0 ){
            const newPassword = generatePassword();
            await db.changePassword(email, newPassword)
            res.status(200).send({message: `Nova senha ${newPassword}`});
        } else {
            res.status(404).send({message: 'Usuario não encontrado'});
        }
    }catch(err){
        res.status(500).send({message: `Houve um erro no bancos de dados.${err}`});
    }
});
export default router