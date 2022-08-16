import * as carritosService from '../services/carritosService.js';
import * as productosService from '../services/productosService.js';
import logger from '../logger.js';
import globals from 'globals';


//Devuelve todos los productos de un carrito
export async function obtenerCarritoUsuario(req, res) {
    logger.info(`GET api/shoppingcartproducts - user: ${globals.emailUser}`);
    let emailUser = globals.emailUser
    try {
        const carrito = await carritosService.obtenerCarrito(emailUser);
        if (carrito) {
            res.status(201).json(carrito); 
        } else res.status(400).json({ msg: `El cliente ${emailUser} no posee un carrito activo` });   
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//Crea un carrito sino existe. Si existe agrega un producto al mismo
export async function generarCarrito(req, res) {
    let idProduct = req.body.productId;
    logger.info(`POST api/shoppingcartproducts `)
    try{
        //Valido si el cliente esta logueado
        if (globals.emailUser === undefined){
            res.status(404).json({ msg: "The user must be logged in to perform this action."})
        }
        //Valido si el producto solicitado
        let product = await productosService.listarProductoPorId(idProduct)
        if (!product) {
            res.status(404).json({ msg: `the product with id ${idProduct} does not exist` })
        }
        return await carritosService.crearCarrito(idProduct)
    }
    catch (err){
        logger.error(err);
        res.status(err.estado).json(err)
    }       
}

//Elimino un producto del carrito
export async function borrarProductoCarrito(req, res) {
    logger.info(`DELETE api/shoppingcartproducts/`);
    let idProducto = req.params.productId;
    try {
        //Valido si el cliente esta logueado
        if (globals.emailUser === undefined){
            res.status(404).json({ msg: "The user must be logged in to perform this action."})
        }
        let resultado = await carritosService.quitarProductoAlCarrito(idProducto)
        if (resultado) {
            res.status(201).json("Se quito producto del carrito");
        } else res.status(400).send('No se pudo borrar el producto');
    } catch (error) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}
