import * as productosService from '../services/productosService.js';
import logger from '../logger.js';


//devuelve todos los productos de la coleccion
export async function obtenerProductos() {
    logger.info(`/graphql - obtenerProductos`)
    try{
        return await productosService.listarProductos()
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//dado un id devuelve los datos de ese producto
export async function obtenerProducto(producto) {
    logger.info(`/graphql - obtenerProducto`)
    try{
        return await productosService.listarProductoPorId(producto.id)
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//Con los datos del body agrega un producto a la coleccion y devuelve el id creado 
export async function generarProducto(producto) {
    logger.info(`/graphql - generarProducto`)
    try{
        return await productosService.crearProducto(producto)
    }
    catch (err){
        logger.error(err);
        return err
    }
}

//dado un id por parametro borra el mismo de la coleccion
export async function borrarProducto(producto) {
    logger.info(`/graphql - borrarProducto`)
    try{
        const res = await productosService.eliminarProducto(producto.id);
        if(res) return producto
    }
    catch (err){
        logger.error(err);
        return err
    }
}