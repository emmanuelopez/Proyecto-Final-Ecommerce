import daoUsuarios from '../databases/usuarios/daoUsuarios.js';
import UsuarioDto from '../models/usuario.js';
import CustomError from '../errores/customError.js'
import logger from '../logger.js'
import config from '../config/config.js'
import { enviarEmail } from '../notificaciones/email.js'


//Obtiene todos los usuarios registrados
export async function getUsuarios() {
    logger.info(`usuariosService.js - getUsuarios`);
    const usuariosObj = await daoUsuarios.getAll();
    return usuariosObj;
}   

//obtiene los datos de un usuario segun email ingresado
export async function getUsuario(email) {
    logger.info(`usuariosService.js - getUsuario(${email})`);
    const usuariosObj = await daoUsuarios.getByEmail(email);
    return usuariosObj;
}   

//alta de usuario nuevo
export async function crearUsuario(objetoUsuario){
    logger.info(`usuariosService.js - crearUsuario`);
    if (!objetoUsuario.email) throw new CustomError(404, `El campo 'email' es obligatorio `)
    if (!objetoUsuario.password) throw new CustomError(404, `El campo 'password' es obligatorio `)
    
    try{
        const usuario = new UsuarioDto(objetoUsuario)
        usuario._id = await daoUsuarios.save(usuario)
        logger.info(`Registro de Usuario Ok `);
        enviarEmailNuevoUsuario(usuario)
        return usuario.get()
    }
    catch (err){
        logger.error(`Error al crear el usuario: ${err}`);
        throw new CustomError(401, `Error al crear el usuario`, err)
    }
}

//deletePedido
export async function deleteUsuario(email) {
    logger.info(`usuariosService.js - deleteUsuario`);
    try{
        console.log(email);
        let res = await daoUsuarios.deleteByEmail(email);
        console.log(res);
        return res
    }
    catch (err){
        logger.error(`Error al borrar el usuario con email: ${email}: ${err}`);
        throw new CustomError(401, `Error al borrar el usuario con email: ${email}`, err)
    }
}  

//login de usuario
export async function login(email, password){
    logger.info(`usuariosService.js - login`)
    try{
        const data = await daoUsuarios.getByEmail(email)
        const usuario = new UsuarioDto(data)
        if (!usuario.isValidPassword(password)) 
            return false
        else
            return usuario.get();
    }
    catch(err){            
        logger.error(`Error al loguearse: ${JSON.stringify(err)}`)    
        throw new CustomError(401, `Error al loguearse`, err)         
    }
}

//enviarEmailNuevoUsuario
export async function enviarEmailNuevoUsuario(objetoUsuario){
    logger.info(`UsuariosApi.js - enviarEmailNuevoUsuario`);
    try {
        let correoDestino = config.MAIL_ADMINISTRADOR
        let asunto = 'Nuevo registro'
        let cuerpo = `<h1> Nuevo Registro </h1>
        <p><strong>Email: </strong>${objetoUsuario.email}</p>
        <p><strong>Username: </strong>${objetoUsuario.username}</p>
        <p><strong>Nombre: </strong>${objetoUsuario.nombre}</p>
        <p><strong>Apellido: </strong>${objetoUsuario.apellido}</p>
        <p><strong>Direccion: </strong>${objetoUsuario.direccion}</p>
        <p><strong>Fecha de Nacimiento: </strong>${objetoUsuario.edad}</p>
        <p><strong>Teléfono: </strong>${objetoUsuario.telefono}</p>
        <p><strong>Avatar: </strong>${objetoUsuario.imagenUrl}</p>
        <p><strong>Roles: </strong>${objetoUsuario.roles}</p>`
        await enviarEmail(correoDestino, asunto, cuerpo)         
    } catch (err) { 
        logger.error(`Falló el envio de mail - error:${err}`) 
    }
}   

export async function existeEmail(email) {
    logger.info(`usuariosService.js - existeEmail ${email}`);
    try {
        let res = await daoUsuarios.getByEmail(email);
        if (res) return true;
        return false
    }
    catch (err) {
        logger.info(`the email don't exists in the Database - msg: ${err.descripcion}`)
        if (err.estado == 404) return false;
        else throw err
    }
}
