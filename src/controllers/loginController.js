import jwt from 'jsonwebtoken';
import { jwtOpts } from '../config/config.js';
import logger from '../logger.js';


//Login exitoso
export async function successLogin (req, res) {
    logger.info(`POST User: successLogin`);
    const token = jwt.sign({ user: req.user }, jwtOpts.secretOrKey, { expiresIn: jwtOpts.expireIn });
    res.status(200).json({msg: `To be able to access the private api you must enter the token ${token}`})
};

//Login fallido
export function failLogin(req, res){
    logger.info(`POST User: failLogin`);
    res.status(401).json({ err: `Login error. The email or password is incorrect`});
}

//Para desloguear al usuario
export function logout(req, res){
    logger.info(`POST User: Logout`)
    if (req.isAuthenticated()){
        req.logout()
    }
    res.status(200).json({msg: `Success Logout`})
}
