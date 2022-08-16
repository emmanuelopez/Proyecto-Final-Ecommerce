import Dao from '../shared/dao.js'


class DaoProductos extends Dao {
    constructor(db) {
        super(db, 'productos')
    }

    async update(id, producto) {
        await this.collection.updateOne({ "id": id }, { '$set': {name: producto.name, description: producto.description, 
        price: producto.price, image: producto.image, stock: producto.stock }});
        return true
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const  daoProductos = new DaoProductos(db)

export default daoProductos
