import bCrypt from 'bcrypt';
import nuID from 'nuid';
import config from '../config/config.js'


export default class UsuarioDto {
    _id;
    id;
    email;
    password;    
    roles;
    name;
    lastname;
    phone;
    image;

    constructor({ _id, id, email, password, roles, name, lastname, phone, image }) {
        if (_id === undefined) {
            this._id = undefined;
            this.id = nuID.next();
            if (email === config.EMAIL_ADMINISTRADOR) {
                this.roles = ["admin"];
            } else {
                this.roles = ["usuario"];
            }
            this.password = createHash(password)
        }
        else {
            this._id = _id;
            this.id = id;
            this.roles = roles;
            this.password = password;
        }

        this.email = email;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
    }

    get() {       
        return this
    }

    isValidPassword(password) {
        return bCrypt.compareSync(password, this.password);
    }
}

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}