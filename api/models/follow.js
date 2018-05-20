'use strict'

const mongoose = require('moongose');
const Schema = moongose.Schema;

const FollowSchema = Schema({
    user: { type: Schema.ObjectId, ref: 'User' },
    followed: { type: Schema.ObjectId, ref: 'User' },
})

module.exports = moongose.model('Follow', FollowSchema)