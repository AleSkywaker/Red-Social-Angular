'use strict'

const express = require('express');
const FollowController = require('../controllers/follow');
const api = express.Router();
const md_auth = require('../middlewares/authentication')

api.post('/follow', md_auth.ensureAuth, FollowController.saveFollow)
api.delete('/follow/:id', md_auth.ensureAuth, FollowController.deleteFollow)
api.get('/following/:id?/:page?', md_auth.ensureAuth, FollowController.getFollowingUsers)
api.get('/followed/:id?/:page?', md_auth.ensureAuth, FollowController.getFollwedUsers)
api.get('/get-my-follows/:followed?', md_auth.ensureAuth, FollowController.geFollows)


module.exports = api;