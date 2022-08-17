import daoCarritos from '../databases/carritos/daoCarritos.js'
import * as productosService from './productosService.js'
import globals from 'globals';
import logger from '../logger.js';


export async function crearCarrito(idProduct) {
    //Si el carrito no existe lo creo
    const emailUser = globals.emailUser;
    const carrito = await obtenerCarrito(emailUser)
    let listaCarritos;
    if (carrito.length === 0) {
        logger.info(`Create new cart ${emailUser} and add the product ${idProduct}`)
        let detallesProducto = await obtenerDetallesProducto(idProduct, 1)
        listaCarritos = await daoCarritos.save({
            "emailUsuario": emailUser,
            "productos": [detallesProducto]
        })
        return detallesProducto
    } else { 
        //Valido si el producto ya se encuentra en el carrito
        const listaProductos = carrito[0].productos
        let existeProductoEnCarrito = false
        let cantidad = 1
        listaProductos.forEach(product => {
            if (product.idProducto === idProduct) {
                existeProductoEnCarrito = true
                cantidad = product.cantidad
            }                    
        })                 
        if (existeProductoEnCarrito) {//Si el producto ya existe en el carrito lo elimino y luego lo vuelvo a cargar con la nueva cantidad
            logger.info(`Add amount 1 to the product ${idProduct}, to the cart of ${emailUser}`)
            cantidad = cantidad + 1
            logger.info(`delete the product ${idProduct}, to the cart of ${emailUser}`)
            daoCarritos.remove(emailUser, idProduct)
        }
        logger.info(`Add the cart of ${emailUser} the product ${idProduct}`)
        let detallesProducto = await obtenerDetallesProducto(idProduct, cantidad)
        agregarProductoAlCarrito(emailUser, detallesProducto)
        return detallesProducto
    }
}
    
export async function obtenerCarrito(emailUsuario) {
    let carrito = await daoCarritos.getByEmail(emailUsuario)
    return carrito;
}

async function obtenerDetallesProducto(idProduct, cantidad){
    const producto = await productosService.listarProductoPorId(idProduct)
    return  {
        "idProducto": producto.id,
        "name": producto.name,
        "description": producto.description,
        "image": producto.image,
        "price": producto.price,
        "cantidad": cantidad    
    }
}

async function agregarProductoAlCarrito(emailUser, objProductoNuevo) {
    return await daoCarritos.add(emailUser, objProductoNuevo);
}

export async function quitarProductoAlCarrito(idProducto) {
    //Valido si existe el carrito
    const emailUser = globals.emailUser;
    const carrito = await obtenerCarrito(emailUser)
    let listaCarritos;
    if (carrito.length === 0) { 
        logger.info(`There is no cart for the user ${emailUser}`)
        return false
    } else { 
        //Valido si el producto existe en el carrito
        const listaProductos = carrito[0].productos
        let existeProductoEnCarrito = false
        let cantidad = 1
        listaProductos.forEach(product => {
            if (product.idProducto === idProducto) {
                existeProductoEnCarrito = true
                cantidad = product.cantidad
            }                    
        })      
        if (existeProductoEnCarrito) {//Si el producto existe en el carrito resto 1 a la cantidad y elimino el producto
            logger.info(`Rest amount 1 to the product ${idProducto}, to the cart of ${emailUser}`)
            cantidad = cantidad - 1
            logger.info(`delete the product ${idProducto}, to the cart of ${emailUser}`)
            daoCarritos.remove(emailUser, idProducto)
            if (cantidad === 0){
                return false
            }else{
                logger.info(`Add the cart of ${emailUser} the product ${idProducto}`)
                let detallesProducto = await obtenerDetallesProducto(idProducto, cantidad)
                listaCarritos = agregarProductoAlCarrito(emailUser, detallesProducto)
                return listaCarritos
            }
        } else {
            const carritoActualizado = await obtenerCarrito(emailUser)
            return carritoActualizado
        }
    }
}