import logger from '../../logger.js'


export default class Dao {
    constructor(db, nombre) {
        this.collectionName = nombre
        this.collection = db.collection(nombre)
    }

    async getAll() {
        let resultado = await this.collection.find().project({ _id: 0 }).toArray()
        return resultado
    }
    
    async getById(id) {
        let resultado = await this.collection.findOne({ "id": id })
        return resultado
    }

    async save(data) {
        let resultado = await this.collection.insertOne(data)
        return resultado
    }

    async deleteById(id) {
        let resultado = await this.collection.deleteOne({ "id": id })
        return resultado
    }
}
