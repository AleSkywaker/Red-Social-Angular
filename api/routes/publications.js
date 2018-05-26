'use strict'

const express = require('express');
const PublicationController = require('../controllers/publications');
const api = express.Router();
const md_auth = require('../middlewares/authentication')


const multipart = require('connect-multiparty')
const md_upload = multipart({ uploadDir: './uploads/publications' })

api.post('/publicar', md_auth.ensureAuth, PublicationController.savePublication)
api.get('/publications/:page?', md_auth.ensureAuth, PublicationController.getPublications)
api.get('/publication/:id?', md_auth.ensureAuth, PublicationController.getPublication)
api.delete('/publication/:id?', md_auth.ensureAuth, PublicationController.deletePublication)

module.exports = api;