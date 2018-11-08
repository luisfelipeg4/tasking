const express = require('express')
const pg = require('pg')
const routes = express.Router()
const service = require('../services/mongo')
routes.use(express.json())
 
/**
 * metodo para retornar todas las filas de tasks
 */
routes.get('/', (req, res, next) => {
    
    service.postgres().select("select id, descripcion, fecha, prioridad, lista from tasks").then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
  });
/**
 * Metodo para eliminar una task
 */
  routes.delete('/:id',(req,res,next)=>{
    var id = req.params.id
    var  query = "delete from tasks where id =" + id; 
    console.log(query)
    service.postgres().delete("delete from tasks where id =" +id ).then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
  });
  
  routes.post('/',(req,res,next)=>{

    const task ={id : req.body.id,
        descripcion: req.body.descripcion,
        fecha : req.body.fecha,
        prioridad: req.body.prioridad,
        lista : req.body.lista
    };
    
    console.log (task)

    var query = "INSERT INTO tasks (id,descripcion,fecha,prioridad,lista) values (" + task.id+",'" + task.descripcion  +"','"+ task.fecha + "'," + task.prioridad+","+ task.lista+ ")"
   console.log(query)
    service.postgres().insert(query).then(function (respuesta) {
        //lo que quiero hacer si recibo algo
        console.log(respuesta);
        res.send(respuesta);
        //catch si no recibe nada
    }).catch(function (error) {
        console.log(error);
        res.send(error); 
    });
  });


  /**
   * Metodo para cambiar de estado una tarea 
   */
  routes.put('/:id',(req,res,next)=>{

    var id = req.params.id
    
    var query = "SELECT lista FROM tasks where id =" + id 
    console.log(query)
    service.postgres().select(query).then(function (respuesta) {
    
        if ( respuesta[0].lista== false) {
            var query2= "UPDATE tasks SET lista ="+true +" where id = " + id;
            service.postgres().update(query2).then(function (respuesta){
                res.send("cambia a true")
            }).catch(function(error){
                console.log(error)
                res.send(error)
            });
        }else {
            var query2= "UPDATE tasks SET lista ="+false +" where id = " + id;
            service.postgres().update(query2).then(function (respuesta){
                res.send("cambia a false")
            }).catch(function(error){
                console.log(error)
                res.send(error)
            });
        }
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
  });

module.exports = routes