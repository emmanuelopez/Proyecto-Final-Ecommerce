import Joi from 'joi'


const schemaNewMessage = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        tipo:Joi.string()
            .required(),
        fechaHora: Joi.string(),
        mensaje: Joi.string()
            .max(100)
            .required()
    }
)

export default schemaNewMessage;
