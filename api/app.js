'use strict'


var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
const user_routes = require('../api/routes/user')
const follow_routes = require('../api/routes/follow')
const publication_routes = require('../api/routes/publications')
const message_routes = require('../api/routes/message')

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//cors


//rutas
app.use('/api', user_routes)
app.use('/api', follow_routes)
app.use('/api', publication_routes)
app.use('/api', message_routes)


//exportar configuracion
module.exports = app;