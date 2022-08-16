import { Router } from 'express'
import { failRoute } from '../controllers/defaultController.js'


const defaultRouter = new Router();

defaultRouter.get('/*', failRoute)
defaultRouter.post('/*', failRoute)
defaultRouter.put('/*', failRoute)
defaultRouter.delete('/*', failRoute)

export default defaultRouter
