import * as mensajesService from '../services/mensajesService.js'
import logger from '../logger.js'


//obtenerMensajes --> devuelve todos los mensajes del chat
export async function obtenerMensajes(req, res) {
    logger.info(`GET api/mensajes`)
    try{
        const listaMensajes = await mensajesService.getMensajes()
        res.status(200).json(listaMensajes)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//obtenerMensajes --> devuelve todos los mensajes del chat
export async function obtenerMensajesPorEmail(req, res) {
    let email = req.params.email
    logger.info(`GET api/mensajes/${email}`)
    try{
        const listaMensajes = await mensajesService.getMensajesByEmail(email)
        res.status(200).json(listaMensajes)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//agregarMensajes --> agrega un nuevo mensaje de chat
export async function agregarMensajes(req, res) {
    logger.info(`POST api/mensajes`)
    try{
        const listaMensajes = await mensajesService.addMensajes(req.body)
        res.status(201).json(listaMensajes)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//borrarMensaje --> borrar un mensaje del chat
export async function borrarMensaje(req, res) {
    let idMensajeChat = req.params.idMensajeChat;
    logger.info(`DELETE /api/mensajes/${idMensajeChat}`)
    try{
        const listaMensajes = await mensajesService.deleteMensaje(idMensajeChat)
        res.status(204).json(listaMensajes)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
