import ProductoDto from '../models/productoDto.js'
import daoProductos from '../databases/productos/daoProductos.js';


export async function listarProductos() {
    return await daoProductos.getAll()
}

export async function listarProductoPorId(idProducto) {
    let producto = await daoProductos.getById(idProducto);
    return new ProductoDto(producto);
}

export async function crearProducto(object) {
    let producto = new ProductoDto(object);
    await daoProductos.save(producto);
    return producto
}

export async function actualizarProducto(id, object) {
    await daoProductos.update(id, object);
    const productsObj = await daoProductos.getById(id);
    return new ProductoDto(productsObj);
}

export async function eliminarProducto(idProducto) {
    let productExist = await daoProductos.getById(idProducto);
    if(!productExist) return false;
    return await daoProductos.deleteById(idProducto);
}
