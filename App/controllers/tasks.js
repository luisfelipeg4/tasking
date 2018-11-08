const express = require('express')
const pg = require('pg')
const routes = express.Router()
const service = require('../services/mongo')
routes.use(express.json())
 
var connectionString = "postgres://ocalhost:5432/tasking"

const connectionData = {
    user: 'luisgarcia',
    host: 'localhost',
    database: 'tasking',
    password: '123',
    port: 5432,
  }

//var pool = new pg.Pool(connectionString)
var pool = new pg.Pool(connectionData)

routes.get('/', (req, response, next) => {
    
    let consulta = (service.postgres().get("select * from tasks"))

    response.send(consulta)


  });

module.exports = routes