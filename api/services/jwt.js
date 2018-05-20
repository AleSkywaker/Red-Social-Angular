'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')

exports.createToken = function(user) {
    let payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, SECRETA)
}