import nuID from 'nuid'


export default class ProductoDto {

    _id;
    id;
    name;
    description;
    price;
    image;
    stock;

    constructor({ _id, id, name, description, price, image, stock}) {


        if (_id === undefined) {
            this._id = undefined;
            this.id = nuID.next();
        }
        else {
            this._id = _id
            this.id = id;     
        }
        
        this.name = name;
        this.description = description;
        this.price = price;
        this.image = image;
        this.stock = stock;
    }

    get() {
        return this
      }

    getforCarrito(){
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            stock: this.stock,
        }
    }
}
