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

routes.get('/', (req, res, next) => {
    
    service.postgres().get("select * from tasks").then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
  });

module.exports = routes