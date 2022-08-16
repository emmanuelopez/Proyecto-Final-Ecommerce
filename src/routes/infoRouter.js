import { Router } from 'express'
import info from '../controllers/infoController.js'


const infoRouter =  Router()

infoRouter.get('/', info);


export default infoRouter
