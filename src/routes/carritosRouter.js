import { Router } from 'express';
import * as carritosController from '../controllers/carritosController.js';
import passport from '../passport/local-auth.js';
import { mdwValidateSchemaNewCarrito } from '../middlewares/carritosMDW.js'


const carritosRouter = Router();

//GET '/' --> obtiene los productos de un carrito con id pasado por parametro
carritosRouter.get('/', 
    passport.authenticate('jwt', { session: false }), 
    carritosController.obtenerCarritoUsuario);

//POST '/' --> agrega un producto al carrito. Si el carrito no existe lo crea
carritosRouter.post('/',
    passport.authenticate('jwt', { session: false }),  
    mdwValidateSchemaNewCarrito,
    carritosController.generarCarrito);

//DELETE '/:id' elimina un producto de un carrito con id pasado por parametro
carritosRouter.delete('/', 
    passport.authenticate('jwt', { session: false }), 
    carritosController.borrarProductoCarrito);

export default carritosRouter
