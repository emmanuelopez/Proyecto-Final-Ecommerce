import logger from '../logger.js'
import * as productosService from '../services/productosService.js'


//Controller obtener todos los productos
export async function obtenerProductos(req, res) {
    logger.info(`GET api/products`);
    try {
        const productos = await productosService.listarProductos();
        res.status(201).json(productos);
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//Controller obtener un producto por id
export async function obtenerUnProducto(req, res) {
    logger.info(`GET api/products/:idProduct`);
    try {
        const idProducto = req.params.idProduct;
        const producto = await productosService.listarProductoPorId(idProducto);
        if (producto) {
            res.status(201).json(producto);
        } else res.status(400).send('No existe el producto con el id: ' + idProducto);  
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err)
    }
}

//Controller generar un nuevo producto
export async function generarProducto(req, res) {
    logger.info(`POST api/products`);
    try {
        const nuevoProducto = await productosService.crearProducto(req.body);
        if (nuevoProducto) {
            res.status(201).json(nuevoProducto);
        } else res.status(400).send('No se pudo crear el producto');
        
    } catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//Controller modificar un producto
export async function modificarProducto(req, res) {
    logger.info(`PUT api/products`);
    try {
        const idProducto = req.params.idProduct;
        const objProducto = {...req.body};
        const productoActualizado = await productosService.actualizarProducto(idProducto, objProducto);
        if (productoActualizado) {
            res.status(201).json(`El producto con id ${idProducto} se actualizo correctamente`);
        } else res.status(400).json('No se pudo actualizar el producto');
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}

//Controller borrar producto
export async function borrarProducto(req, res) {
    logger.info(`DELETE api/products`);
    try {
        const idProducto = req.params.idProduct;
        const resultado = await productosService.eliminarProducto(idProducto);
        if (resultado) {
            res.status(201).json({msg: 'Producto borrado'});
        } else res.status(400).json({msg: `No se encontro el producto con id ${idProducto}`});
    } 
    catch (err) {
        logger.error(err);
        res.status(err.estado).json(err);
    }
}
