import Joi from 'joi'

const schemaNewUser = Joi.object(
    {
        email: Joi.string()
            .email()
            .required(),
        password:Joi.string()
            .min(2)
            .max(15)
            .required(),
        name: Joi.string()
            .required(),
        lastname: Joi.string()
            .required(),
        phone: Joi.string()
            .required(),
        image: Joi.string()
    }
)

export default schemaNewUser;
