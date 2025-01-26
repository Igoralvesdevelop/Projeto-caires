import jwt from 'jsonwebtoken';
export function verifyJWT(req, res, next) {
const secret = 'Senh@CrIpTOgr@FaaDA!?';

     const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).send({ message:'Token não informado.'});

        const parts = authHeader.split(' ');
        if(parts.length !== 2) return res.status(401).send({ message: 'Token inválido.'});

        const [scheme, token] = parts;
        if(!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token inválido.'});
        
        jwt.verify(token, secret, (err, decoded) => {
            console.log(token)
        if(err) {
        return res.status(401).send({message: 'Usuário não autenticado.'});
        }
        req.infoUser = decoded.infoUser;
        return next();
        });
}
