
const express = require('express');

app= express()

const routes = require('./routes')
app.use('/',routes)

app.use(function(req,res){
    console.log(req.method)
    res.send('prueba2')
})

app.listen(3000, function()  {
    console.log(`El servidor se está ejecutando en http://127.0.0.1:3000/`);
  });
  