import Joi from 'joi'

const schemaNewCarrito = Joi.object(
    {
        productId: Joi.string()
            .required(),        
    }
)

export default schemaNewCarrito;