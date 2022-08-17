import { Router } from 'express';
import  * as ordersController from '../controllers/ordersController.js';
import passport from '../passport/local-auth.js';
import { esAdministrador } from '../controllers/usuariosController.js';


const ordersRoutes = new Router();

//GET '/api/orders' -> devuelve las ordenes realizadas por el usuario
ordersRoutes.get('/', 
    passport.authenticate('jwt', { session: false }), 
    ordersController.obtenerOrdenes);

//GET '/api/orders' -> pasa el carrito de compras a ordenes y borra el carrito  
ordersRoutes.post('/', 
    passport.authenticate('jwt', { session: false }), 
    ordersController.crearOrden);

//DELETE '/api/orders/{idOrder}' -> delete a order by id           
ordersRoutes.delete('/:idOrder', 
    passport.authenticate('jwt', { session: false }), 
    esAdministrador,
    ordersController.borrarOrden);

export default ordersRoutes 
