import logger from '../logger.js'
import * as mensajesService from '../services/mensajesService.js'


let rolUsuario = undefined
let nombreUsuario = ""
let emailUsuario = ""

//mensajesChat
export async function mensajesChat(req, res) {
    logger.info(`webController.js: mensajesChat`)
  
    try{
      const title = 'Mensajes del Chat'
      const mensajesChatList = await mensajesService.getMensajes()
      res.render('pages/chat', { titulo: title, rol: rolUsuario, nombre: nombreUsuario, email: emailUsuario, mensajesChatList })
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }
}
