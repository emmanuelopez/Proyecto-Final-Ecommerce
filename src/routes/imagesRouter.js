import { Router } from 'express'
import * as imagesController from '../controllers/imagesController.js'
import { uploadProducts, uploadUsers } from "../multer.js"


const imagesRouter = Router()

//SUBIR ARCHIVOS
imagesRouter.post('/product', uploadProducts.single("image"), imagesController.uploadFileProduct)
imagesRouter.post('/user', uploadUsers.single("image"), imagesController.uploadFileUser)

export default imagesRouter