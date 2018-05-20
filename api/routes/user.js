'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authentication')

api.get('/home', UserController.home)
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas)
api.post('/register', UserController.saveUser)
api.post('/login', UserController.loginUser)
api.get('/usuario/:id', md_auth.ensureAuth, UserController.getUser)
api.get('/usuarios/:page?', md_auth.ensureAuth, UserController.getUsers)
api.put('/actualizar-usuario/:id', md_auth.ensureAuth, UserController.updateUser)

module.exports = api;