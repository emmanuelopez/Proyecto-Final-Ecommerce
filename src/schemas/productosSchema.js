import Joi from 'joi'


const schemaNewProduct = Joi.object(
    {
        id: Joi.string(),
        name: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        price: Joi.number()
            .precision(2)
            .positive()
            .required(),
        stock: Joi.number()
            .integer()
            .positive(),
        image: Joi.string()
            .required(),
    }
)

export default schemaNewProduct;
