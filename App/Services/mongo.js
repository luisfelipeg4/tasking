
/**
 * Servicio de Postgressql
 * 
 */
const pg = require('pg')

module.exports = {
  postgres : function () {
    return new CrudOperations();
  }
};

class CrudOperations {
  constructor() {

  }
  
  async get(query){
    const connectionData = {
      user: 'luisgarcia',
      host: 'localhost',
      database: 'tasking',
      password: '123',
      port: 5432,
    }
    var pool = new pg.Pool(connectionData)
    const consulta =[]
    const findAllQuery = query;
    try {
      let rows = await pool.query(findAllQuery);
      console.log(rows["rows"])
      return rows["rows"]
    } catch(error) {
      return error;
    }
    
  } 
}
