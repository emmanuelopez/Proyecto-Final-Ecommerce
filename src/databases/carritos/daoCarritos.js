import Dao from '../shared/dao.js'


class DaoCarritos extends Dao {
    constructor(db) {
        super(db, 'carritos')
    }

    async getByEmail(email) {
        return this.listByQuery({ emailUsuario: email })
    }

    async add(emailUser, objProducto) {
        let res = await this.collection.updateOne({ emailUsuario: emailUser }, { '$push': { productos: objProducto } })
        if (res.modifiedCount == 0) return false;
        return await this.getByEmail(emailUser)
    }

    async remove(emailUser, idProducto){
        let res = await this.collection.updateOne({ emailUsuario: emailUser }, { '$pull': { productos: { "idProducto" : { $eq: idProducto } } } })
        if (res.modifiedCount == 0) return false;
        return await this.getByEmail(emailUser)
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const daoCarritos = new DaoCarritos(db)

export default daoCarritos
