import logger from '../logger.js';
import * as usuariosService from '../services/usuariosService.js';


//Devuelve todos los usuarios de la coleccion
export async function getAll(req, res) {
    logger.info(`usuariosController.js: obtenerUsuarios`)
    try{
        const usuarios = await usuariosService.getUsuarios()
        res.status(200).json(usuarios)
    }
    catch (err){
        logger.warn(err)
        res.status(err.estado).json(`Error al buscar todos los usuarios: ${err}`)
    }
}

//Registro exitoso
export async function successRegister(req, res){
    logger.info(`POST User: successRegister`);
    res.status(201).json({ msg: `Registration was successful` });
}

//Registro fallido
export async function failRegister(req, res){
    logger.info(`POST User: failRegister`);
    try {
        res.status(403).json({ err: "The user is already registered" });
      } catch (error) {
        res.status(404).json(error);
      }
}

//Dado un email por parametro borra el mismo de la coleccion
export async function borrarUsuario(req, res) {    
    let email = req.params.email;
    logger.info(`DELETE User: borrarUsuario --> ${email}`)
    try{
        await usuariosService.deleteUsuario(email)
        res.status(204).json({msg: `The user ${email} was removed succesfully`})
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(`Error deleting user: ${err}`)
    }
}

//Valido si el usuario es administrador
export function esAdministrador(req, res, next) {
    logger.info(`usuariosController.js: esAdministrador`)
    let administrador = false
    req.user.roles.forEach(element => {
        if (element == 'admin')
            administrador = true
    });

    if(administrador)
        next()
    else {
        logger.warn(`El usuario ${req.user.email} no tiene permisos de administrador y quizo acceder a una ruta no autorizada.`);
        res.status(401).json({ err: `Ruta no autorizada. El usuario ${req.user.email} no tiene permisos de administrador.` })
    }
}

//validate token
export function validarToken(token, cb) {
    logger.info(`usuariosController.js: validarToken`)
    if (token.exp < Math.floor(Date.now() / 1000)) {
        logger.warn('The token has expired, you must log in again to generate a new token')
        return cb(null, false)
    }
    else return cb(null, token.user);
}
