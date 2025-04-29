import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { generateToken } from "../helpers/userfeatures.js";
import mysql from "../repository/mysql.js";

const secret = process.env.JWT_SECRET || 'Senh@CrIpTOgr@FaaDA!?';

// Função para verificar token JWT
export function verifyJWT(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.infoUser;
        next();
    } catch (error) {
        return res.status(403).send({ message: 'Token inválido ou expirado.' });
    }
}

// Função para login de funcionário
export async function loginFuncionario(req, res) {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).send({ message: "Email e senha são obrigatórios." });
        }

        const connect = await mysql.bancoDados();
        const [rows] = await connect.query('SELECT * FROM usuarios WHERE email = ? AND deletado = 0', [email]);
        connect.end();

        const usuario = rows[0];
        if (!usuario) return res.status(401).send({ message: "Usuário não encontrado." });

        if (!bcrypt.compareSync(senha, usuario.senha)) return res.status(401).send({ message: "Senha inválida." });

        const token = generateToken(usuario.id_usuario, usuario.nome);

        res.status(200).send({
            message: "Login realizado com sucesso!",
            token,
            usuario: {
                id: usuario.id_usuario,
                nome: usuario.nome,
                nivel: usuario.nivel_acesso
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Erro interno do servidor." });
    }
}
