import Dao from '../shared/dao.js'


class DaoUsuarios extends Dao {
    constructor(db) {
        super(db, 'usuarios')
    }

    async getByEmail(email) {
        return await this.collection.findOne({ email })
    }

    async getByUsername(username) {
        return await this.collection.findOne({ username })
    }

    async deleteByEmail(email) {
        return await this.collection.deleteOne({ email })
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js')
const  daoUsuarios = new DaoUsuarios(db)

export default daoUsuarios
