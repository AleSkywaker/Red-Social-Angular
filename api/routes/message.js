'use strict'

const express = require('express');
const MessageController = require('../controllers/message');
const api = express.Router();
const md_auth = require('../middlewares/authentication')


api.post('/guardar-message', md_auth.ensureAuth, MessageController.saveMessage)


module.exports = api;