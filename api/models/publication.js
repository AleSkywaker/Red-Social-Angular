'use strict'

const mongoose = require('moongose');
const Schema = moongose.Schema;

const PublicationSchema = Schema({
    text: String,
    file: String,
    create_at: String,
    user: { type: Schema.ObjectId, ref: 'User' }
})

module.exports = moongose.model('Publication', PublicationSchema)