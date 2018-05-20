'user strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    surname: String,
    nick: String,
    email: String,
    role: String,
    password: String,
    image: String
})

module.exports = mongoose.model('User', UserSchema)