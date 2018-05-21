'use strict'

const express = require('express');
const FollowController = require('../controllers/follow');
const api = express.Router();
const md_auth = require('../middlewares/authentication')



api.get('/follow', md_auth.ensureAuth, FollowController.prueba)


module.exports = api;