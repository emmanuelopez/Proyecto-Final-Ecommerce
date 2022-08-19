const socket = io.connect();


//Obtengo plantilla para renderizar mensajes
async function plantillaMensajes() {
    return await fetch('/plantillas/mensajesChat.ejs')
        .then(respuesta => respuesta.text())
}

//Construyo HTML 
function htmlChat(plantilla, plantillaMensajes) {
    const render = ejs.compile(plantilla);
    const html = render({ plantillaMensajes }) 
    return html
}

//agregarMensaje
function agregarMensaje(e) {
    const mensaje = {
       email: document.getElementById('email').value,
       tipo: document.getElementById('email').value,
       mensaje: document.getElementById('mensaje').value
    };
    document.getElementById('listaMensajes').value = ''
    socket.emit('nuevoMensajeChat', mensaje);
    return false;
}

//------------------------------------------------------------
//--------------------  PRINCIPAL-----------------------------
socket.on('mensajesChat', async mensajesChat => {
    const plantilla = await buscarPlantillaMensajes()
    const html = armarHTMLChat(plantilla, mensajesChat)
    document.getElementById('listaMensajes').innerHTML = html;
});
//------------------------------------------------------------