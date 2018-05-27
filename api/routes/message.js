'use strict'

const express = require('express');
const MessageController = require('../controllers/message');
const api = express.Router();
const md_auth = require('../middlewares/authentication')


api.post('/guardar-message', md_auth.ensureAuth, MessageController.saveMessage)
api.get('/trae-message/:page?', md_auth.ensureAuth, MessageController.getReceivedMessage)
api.get('/messages-emitidos/:page?', md_auth.ensureAuth, MessageController.getEmitedMessage)
api.get('/messages-noleidos', md_auth.ensureAuth, MessageController.getUnviewedMessages)


module.exports = api;