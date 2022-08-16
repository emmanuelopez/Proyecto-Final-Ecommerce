import schemaNewCarrito from '../schemas/carritoSchema.js';
import logger from '../logger.js';


export async function mdwValidateSchemaNewCarrito(req, res, next) {
    logger.info(`middlewares/carritoMDW.js: mdwValidateSchemaCarrito`);
    try {
        await schemaNewCarrito.validateAsync(req.body);
    }
    catch (err) {
        logger.warn(`Error al validar el esquema de carrito  - Error: ${err}`);
        return res.status(400).json({ descripcion: `Error al validar el esquema de carrito - Error: ${err}` });
    }
    next();
}
