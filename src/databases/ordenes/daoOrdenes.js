import Dao from '../shared/Dao.js';


class DaoOrdenes extends Dao {
  constructor(db) {
    super(db, 'orders')
  }

  async getByEmail(email)
  {
    return await this.collection.find(email).toArray()
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

const { db } = await import('../shared/mongodb/mongoClient.js')
const daoOrdenes = new DaoOrdenes(db)

export default daoOrdenes
