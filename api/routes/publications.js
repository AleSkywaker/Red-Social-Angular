'use strict'

const express = require('express');
const PublicationController = require('../controllers/publications');
const api = express.Router();
const md_auth = require('../middlewares/authentication')


const multipart = require('connect-multiparty')
const md_upload = multipart({ uploadDir: './uploads/publications' })

api.get('/probando', md_auth.ensureAuth, PublicationController.probando)
api.post('/publicar', md_auth.ensureAuth, PublicationController.savePublication)

module.exports = api;