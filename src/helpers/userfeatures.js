import jwt from 'jsonwebtoken';
function generateToken(id_login, user_name) {
    const secret = 'Senh@CrIpTOgr@FaaDA!?';
 return jwt.sign({infoUser: {id_login, userName: user_name}}, secret, {expiresIn: 60 * 60 * 5});
}
export {generateToken};