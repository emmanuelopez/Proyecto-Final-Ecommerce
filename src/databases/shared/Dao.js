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

    async listByQuery(query){
        try {
            return await this.collection.find(query).toArray()
        }
        catch (err) {
            logger.error(err)
            throw new CustomError(500, `error getting all records in collection ${this.collectionName}`, err)
        }
    }
}
