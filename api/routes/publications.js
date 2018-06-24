'use strict'

const express = require('express');
const PublicationController = require('../controllers/publications');
const api = express.Router();
const md_auth = require('../middlewares/authentication')


const multipart = require('connect-multiparty')
const md_upload = multipart({
    uploadDir: './uploads/publications'
})

api.post('/publicar', md_auth.ensureAuth, PublicationController.savePublication)
api.get('/publication/:id', md_auth.ensureAuth, PublicationController.getPublication)
api.get('/publications/:page?', md_auth.ensureAuth, PublicationController.getPublications)
api.get('/publications-user/:user/:page?', md_auth.ensureAuth, PublicationController.getPublicationsUser)
api.delete('/publication/:id', md_auth.ensureAuth, PublicationController.deletePublication)
api.post('/upload-image-pub/:id', [md_auth.ensureAuth, md_upload], PublicationController.uploadImage)
api.get('/get-image-pub/:imageFile', PublicationController.getImages)


module.exports = api;