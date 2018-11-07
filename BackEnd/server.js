// Import configuration 
var config = require('./config.json');
// Express 
var express = require('express');
// Serve-Static 
var serveStatic = require('serve-static');
// Body-Parser 
var bodyParser = require('body-parser');
// Multer 
var multer = require('multer');
// PostgreSQL 
var massive = require("massive");

var massiveInstance = massive.connectSync({ connectionString: connectionString });
var db;

var app = express();
var startExpress = function () {
    app.listen(config.express.port);
    db = app.get('db');
}
var initialize = function () {
    startExpress()
}

var handleError = function (res) {
    return function (err) {
        console.log(err)
        res.send(500, { error: err.message });
    }
}

// Retrieve table content 
var list = function (request, res, next) {
    db.steps.findDoc(1, function (err, doc) {
        if (err) {
            handleError(res)
        };
        console.log(doc.data);
        res.json({ data: doc.data });
    });
}

var update = function (request, res, next) {
    var newDoc = request.body.data;
    db.steps.saveDoc({ id: 1, data: newDoc }, function (err, response) {
        if (err) { 
            handleError(res) 
        };
        console.log(response)
        res.json({
             data: response 
            });
    });
}