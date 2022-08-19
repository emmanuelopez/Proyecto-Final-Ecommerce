import { Router } from 'express'
import * as webController from '../controllers/webController.js'


const webRouter = Router()

//CHAT
webRouter.get('/chat', webController.mensajesChat);

export default webRouter 