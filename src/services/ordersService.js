import daoOrdenes from '../databases/ordenes/daoOrdenes.js';
import daoUsuarios from '../databases/usuarios/daoUsuarios.js';
import * as carritosService from '../services/carritosService.js'
import OrderDto from '../models/orden.js';
import CustomError from '../errores/CustomError.js';
import logger from '../logger.js';
import { enviarEmail } from '../notificaciones/email.js';
import { enviarWhatsapp } from '../notificaciones/whatsapp.js';
import { enviarSMS } from '../notificaciones/sms.js';
import config from '../config/config.js';


export async function getOrdersByEmail(email) {
    try{
        return await daoOrdenes.getByEmail(email);
    }
    catch (err){
        logger.error(`Error requesting orders from a user: ${err}`);
        throw new CustomError(401, `Error requesting orders from a user`, err)
    }
}

export async function addOrder(emailUser) {
    //obtener los productos del carrito y armo una lista con los idProductos
    const carritoActivo = await carritosService.obtenerCarrito(emailUser)
    const productoOrdenado = carritoActivo[0].productos
    //crear un pedido
    const nuevaOrden = {
        "email": emailUser,        
        "productos": productoOrdenado
    }        
    //borrar el carrito
    await carritosService.deleteCarrito(carritoActivo[0].id)    
    try{
        //cargo el pedido
        const pedido = new OrderDto(nuevaOrden)
        await daoOrdenes.save(pedido);
        logger.info(`Registro de pedido Ok `);
        //obtengo los datos del usuario
        const usuario = await daoUsuarios.getByEmail(pedido.email) 
        //envio de notificaciones al admin y usuario
        await this.enviarEmailNuevoPedido(pedido.email, pedido, usuario.name, usuario.lastname)
        await this.enviarEmailNuevoPedido(config.EMAIL_ADMINISTRADOR, pedido, usuario.name, usuario.lastname)
        //await this.enviarWhatsappNuevoPedido(pedido.email, usuario.name, usuario.lastname)
        //await this.enviarSMSPedidoEnProceso(usuario.phone)
        return pedido.get();
    }
    catch (err) {
        logger.error(`Error adding an order: ${err}`);
        throw new CustomError(401, `Error adding an order`, err)
    }
}      

export async function deleteOrder(idOrder) {
        try{
            return await daoOrdenes.deleteById(idOrder);
        }
        catch (err){
            logger.error(`Error deleting order${idOrder}: ${err}`);
            throw new CustomError(401, `Error deleting order ${idOrder}`, err)
        }
    }  

    //enviarEmailNuevoUsuario
export async function enviarEmailNuevoPedido(email, pedido, nombre, apellido){
        try {
            const objetoPedidos = pedido.productos
            let listadoProductosHTML = ""
            objetoPedidos.forEach(element => {
                listadoProductosHTML = listadoProductosHTML 
                        + "<tr><td>"+element.idProducto+"</td><td>"
                        +element.name+"</td><td>"
                        +element.description+"</td><td>"
                        +element.image+"</td><td>"
                        +element.price+"</td><td>"
                        +element.cantidad+"</td></tr>"
            });
            //armo los datos que voy a enviar por email
            let correoDestino = email
            let asunto = `New order of ${nombre} ${apellido} - ${pedido.email}`
            let cuerpo = `<h1> New Order of ${nombre} ${apellido} - ${pedido.email}</h1>
            <p><strong>User email: </strong>${pedido.email}</p>
            <p><strong>Date of purchase by the user: </strong>${pedido.fechaPedida}</p>
            <p><strong>Purchased products: </strong></p>
            <p>
            <table border=1>
                <tr>
                    <th>Id Producto</th>
                    <th>name</th>
                    <th>description</th>
                    <th>image</th>
                    <th>price</th>
                    <th>amount</th>
                </tr>
                ${listadoProductosHTML}
            </table></p>`
            await enviarEmail(correoDestino, asunto, cuerpo)         
        } catch (err) { 
            logger.error(`The sending of the email of the new order failed - error:${err}`) 
        }
    }   

    //enviarWhatsappNuevoPedido
export async function enviarWhatsappNuevoPedido(email, nombre, apellido){
        try {                
            let from = 'whatsapp:+14155238886'  // es el celu de twilio el que envia whatsapp
            let to = process.env.WHATSAPP_USER_ADMIN
            let body = `New order of ${nombre} ${apellido} - ${email}`
            // mediaUrl: [ '' ]
            await enviarWhatsapp(from, to, body)         
        } catch (err) { 
            logger.error(`The WhatsApp delivery of the new order failed - error:${err}`) 
        }
    }   

        //enviarSMSPedidoEnProceso
export async function enviarSMSPedidoEnProceso(telefonoUsuario){
            try {              
                let from = '+18647404967'  
                let to = telefonoUsuario
                let body = `Your order has been received and is in process`
                // mediaUrl: [ '' ]
                await enviarSMS(from, to, body)         
            } catch (err) { 
                logger.error(`The sending of confirmation SMS to the user failed - error:${err}`) 
            }
        }   

        
