import schemaNewProduct from '../schemas/productosSchema.js'
import logger from '../logger.js'

export async function mdwValidateSchemaNewProduct(req, res, next) {
    logger.info(`middlewares/productosMDW.js: mdwValidateSchemaNewProduct`)
    try {
        await schemaNewProduct.validateAsync(req.body)
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de productos - Error: ${err}`)
        return res.status(400).json({ descripcion: `Error al validar el esquema de productos - Error: ${err}` })
    }
    next();
}
