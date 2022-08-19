import logger from './logger.js'
import chat from './services/chatService.js'


export default class MySocket {

    constructor(io) {
        this.io = io;
    }

    on() {
        this.io.on('connection', async socket => {
            logger.info(`Se conecto al socket on connection`)

            // LISTADO DE MENSAJES DEL CHAT
            //let listadoTodosLosMensajesChat = await chat.getMensajesChat();
            let listarChatCompleto = []
            socket.emit('mensajesChat', listarChatCompleto)/* Envio los mensajes al cliente que se conectó */           
            socket.on('nuevoMensajeChat', async data => { /* Escucho los mensajes enviado por el cliente y se los propago a todos */
                  logger.info(`socket.on nuevoMensajeChat`)
                  listarChatCompleto = await chat.addMensajeChat(data)
                  this.io.sockets.emit('mensajesChat', listarChatCompleto)
             })
        })
    }
}
