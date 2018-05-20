'use strict'

require('./config');

const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

//conexion database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/red_social')
    .then(() => {
        console.log('conexion establecida con base de datos de Mongo')

        //conexion servidor
        app.listen(port, () => {
            console.log(`servidor conectado en http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err))