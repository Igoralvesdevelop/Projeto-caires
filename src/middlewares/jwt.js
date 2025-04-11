import jwt from 'jsonwebtoken';
import { generateToken } from "../helpers/userfeatures.js";
export function verifyJWT(req, res, next) {

const secret = 'Senh@CrIpTOgr@FaaDA!?';

async function loginFuncionario(req, res) {
    const { email, senha } = req.body;

    const connect = await mysql.bancoDados();
    const [rows] = await connect.query('SELECT * FROM usuarios WHERE email = ? AND deletado = 0', [email]);
    connect.end();

    const usuario = rows[0];
    if (!usuario) return res.status(401).send({ message: "Usuário não encontrado" });

    if (senha !== usuario.senha) return res.status(401).send({ message: "Senha inválida" });

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
}
}
