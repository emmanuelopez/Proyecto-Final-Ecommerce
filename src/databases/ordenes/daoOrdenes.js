import Dao from '../shared/dao.js';


class DaoOrdenes extends Dao {
    constructor(db) {
        super(db, 'ordenes')
    }

    async getByEmail(email) {
        return await this.listByQuery({ email: email });
    }
}

const { db } = await import('../shared/mongodb/mongoClient.js');
const daoOrdenes = new DaoOrdenes(db);

export default daoOrdenes
