import * as ordersService from '../services/ordersService.js';
import logger from '../logger.js';
import globals from 'globals';


//Obtiene todas las ordenes creadas por el usuario 
export async function obtenerOrdenes(req, res) {
    logger.info(`ordersController.js: obtenerOrdenes - GET /api/orders`);
    try{
        if (globals.emailUser === undefined) {
            res.status(404).json({msg: "The user is not logged in or the token has expired"});
        }else {
            const ordenes = await ordersService.getOrdersByEmail(globals.emailUser);
            res.status(200).json(ordenes);
        }
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//add a new order: cart content is added by creating an order and then the cart is deleted
export async function crearOrden(req, res) {
    const emailUser = globals.emailUser;
    logger.info(`ordersController.js: crearOrden - POST /api/orders para el usuario ${emailUser}`);
    try{
        if (emailUser === undefined){
            res.status(404).json({msg: "The user is not logged or the token has expired"});
        } else {
            const pedido = await ordersService.addOrder(emailUser);
            res.status(201).json(pedido);
        }
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

// Borra una orden segun su Id
export async function borrarOrden(req, res) {
    let idOrder = req.params.idOrder;
    logger.info(`ordersController.js: borrarOrden - DELETE /api/orders/${idOrder}`);
    try{
        const ordersList = await ordersService.deleteOrder(idOrder);
        res.status(204).json(ordersList);
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err);
    }
}
