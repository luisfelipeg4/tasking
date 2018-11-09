const express = require('express')
const routes = express.Router()

routes.use('/tasks',require('./app/controllers/tasks'))
routes.use(express.json())


module.exports=routes