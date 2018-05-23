'use strict'

const path = require('path')
const fs = require('fs')
const moment = require('moment')
const mongoosePaginate = require('mongoose-pagination')

const Publication = require('../models/publication')
const User = require('../models/user')
const Follow = require('../models/follow')


function probando(req, res) {
    return res.status(200).send({ message: "Hola Hola" })
}



module.exports = {
    probando
}