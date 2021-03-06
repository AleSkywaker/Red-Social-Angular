'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authentication')

const multipart = require('connect-multiparty')
const md_upload = multipart({
    uploadDir: './uploads/users'
})

api.get('/home', UserController.home)
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.saveUser)
api.post('/login', UserController.loginUser)
api.get('/usuario/:id', md_auth.ensureAuth, UserController.getUser)
api.get('/usuarios/:page?', md_auth.ensureAuth, UserController.getUsers)
api.get('/counter/:id?', md_auth.ensureAuth, UserController.getCounters)
api.put('/actualizar-usuario/:id', md_auth.ensureAuth, UserController.updateUser)
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage)
api.get('/get-image/:imageFile', UserController.getImages)

module.exports = api;