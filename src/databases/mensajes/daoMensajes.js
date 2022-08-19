import Dao from "../shared/dao.js";


class DaoMensajes extends Dao {
  constructor(db) {
    super(db, 'mensajes');
  }

  async getByEmail(email) {
    return super.listByQuery({ email: email });
  }
}

const { db } = await import('../shared/mongodb/mongoClient.js');
const daoMensajes = new DaoMensajes(db);

export default daoMensajes;
