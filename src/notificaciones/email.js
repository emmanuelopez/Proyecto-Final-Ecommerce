import { createTransport } from 'nodemailer';
import { ServidorEnvioEmail } from '../config/config.js';
import logger from '../logger.js';


const transporter = createTransport(ServidorEnvioEmail);

transporter.verify(function (error, success) {
    if (error) { logger.error(`Envio de mail fallo la verificacion del servidor ${error}`);
         return;
    } else {
        logger.info("Server is ready to take our messages.");
    }
});

export async function enviarEmail(correoDestino, asunto, cuerpo) {

    logger.info("Enviando email con la notificación del nuevo pedido ...")

    const mailOptions = {
        from:'Servidor NodeJS',
        to: 'emalopez2905@gmail.com',
        subject: 'proyecto-final',
        html: `<h1>Ecommerce</h1>`
    }

    try{
        let info = await transporter.sendMail(mailOptions)
        logger.info(info)
        return info.messageId;
        //return "no envia email para no gastar dolares"  
    }
    catch(err)
    {
        logger.error(err)
    }
}