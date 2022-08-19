import moment from 'moment'
import daoMensajes from '../databases/mensajes/daoMensajes.js'
import MensajeDto from '../models/mensajeDto.js';
import logger from '../logger.js'
import CustomError from '../errores/CustomError.js'

    
//Obtener mensajes
export async function getMensajes() {        
        try{
            return await daoMensajes.getAll()
        }
        catch (err){
            logger.error(`Error getting all messages: ${err}`);
            throw new CustomError(401, `Error getting all messages:`, err)
        }
    }

//Obtener mensajes por email
export async function getMensajesByEmail(email) {        
        try{
            return await daoMensajes.getByEmail(email)
        }
        catch (err){
            logger.error(`Error getting all messages from ${email}: ${err}`);
            throw new CustomError(401, `Error getting all messages from ${email}:`, err)
        }
    }

//Agregar un mensaje
export async function addMensajes(data) {
        try{
            data.fechayhora = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
            const mensajeChat = new MensajeDto(data)
            await daoMensajes.save(mensajeChat)
            return await daoMensajes.getAll()
        }
        catch (err){
            logger.error(`Error adding message to chat: ${err}`);
            throw new CustomError(401, `Error adding message to chat`, err)
        }
    }  

//Borrar un mensaje
export async function deleteMensaje(idMensajeChat) {
        try{
            return await daoMensajes.deleteById(idMensajeChat);
        }
        catch (err){
            logger.error(`Error deleting message ${idMensajeChat}: ${err}`);
            throw new CustomError(401, `Error deleting message ${idMensajeChat}`, err)
        }
    }  
