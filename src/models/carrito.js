import nuID from 'nuid'
import moment from 'moment'

export default class CarritoDto {

    _id;
    id;
    estado;
    emailUsuario;
    productos;
    fechaUltModif;

    constructor({ _id, id, estado, emailUsuario, productos, fechaUltModif}) {

        if (_id === undefined) {
            this._id = undefined;
            this.id = nuID.next();
            this.estado = "abierto"
            this.fechaUltModif = moment(new Date()).format('DD/MM/YYYY HH:MM:SS');
        }
        else {
            this._id = _id;
            this.id = id;
            this.estado = estado
            this.fechaUltModif = fechaUltModif
        }

        this.emailUsuario = emailUsuario;
        this.productos = productos;
    }

    get() {
        return this
    }
}
