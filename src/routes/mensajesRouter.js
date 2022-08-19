import { Router } from 'express';
import  * as mensajesController from '../controllers/mensajesController.js';
import passport from '../passport/local-auth.js';
import { esAdministrador } from '../controllers/usuariosController.js';
import { mdwValidateSchemaNewMensaje } from '../middlewares/mensajesMDW.js';


const mensajesRouter = new Router();

//GET '/mensajes' -> devuelve todos los mensajes
mensajesRouter.get('/', 
        passport.authenticate('jwt', { session: false }), 
        mensajesController.obtenerMensajes);
//GET '/mensajes' -> devuelve todos los mensajes de un usuario en particular
mensajesRouter.get('/:email', 
        passport.authenticate('jwt', { session: false }), 
        mensajesController.obtenerMensajesPorEmail);
//POST '/mensajes' -> alta de nuevo mensaje de chat 
mensajesRouter.post('/', 
        passport.authenticate('jwt', { session: false }), 
        mdwValidateSchemaNewMensaje,
        mensajesController.agregarMensajes);
//GET '/mensajes/:idMensajeChat' -> devuelve un mensaje del chat x id
mensajesRouter.delete('/:idMensajeChat', 
        passport.authenticate('jwt', { session: false }), 
        esAdministrador,
        mensajesController.borrarMensaje);

export default mensajesRouter
