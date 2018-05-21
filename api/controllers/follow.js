'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination')

const User = require('../models/user')
const Follow = require('../models/follow')

function prueba(req, res) {
    res.status(200).send({ message: 'Hola desde pruebas' })
}

module.exports = {
    prueba
}