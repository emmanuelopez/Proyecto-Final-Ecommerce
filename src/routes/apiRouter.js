import { Router } from 'express';
import productosRouter from './productosRouter.js';
import carritosRouter from './carritosRouter.js';
import ordersRouter from './ordersRouter.js';
import imagesRouter from './imagesRouter.js';
import usuariosRouter from './usuariosRouter.js';


const apiRouter = Router()

apiRouter.use('/users', usuariosRouter) // registro de usuarios
apiRouter.use('/products', productosRouter) // productos disponibles en la pagina
apiRouter.use('/shoppingcartproducts', carritosRouter) // carritos de compra de los usuarios
apiRouter.use('/orders', ordersRouter) // ordenes de compra
apiRouter.use('/images', imagesRouter) // ruta para cargar las imagenes

export default apiRouter 