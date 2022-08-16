import { Router } from 'express';
import * as productosController from '../controllers/productosController.js';
import passport from '../passport/local-auth.js';
import { esAdministrador } from '../controllers/usuariosController.js';
import {mdwValidateSchemaNewProduct} from "../middlewares/productosMDW.js";


const productosRouter = Router()

//GET '/' --> obtiene todos los productos
productosRouter.get('/', productosController.obtenerProductos);

//GET '/:id' --> obtiene un producto segun el id pasado por parametro
productosRouter.get('/:idProduct', productosController.obtenerUnProducto);

//POST '/' --> crea un nuevo producto
productosRouter.post('/', 
    passport.authenticate('jwt', { session: false }), 
    esAdministrador,
    mdwValidateSchemaNewProduct,
    productosController.generarProducto);

//PUT '/:id' actualiza un producto con id pasado por parametro
productosRouter.put('/:idProduct', 
    passport.authenticate('jwt', { session: false }), 
    esAdministrador,
    productosController.modificarProducto);

//DELETE '/:id' elimina un producto con id pasado por parametro
productosRouter.delete('/:idProduct', 
    passport.authenticate('jwt', { session: false }), 
    esAdministrador,
    productosController.borrarProducto);

export default productosRouter
