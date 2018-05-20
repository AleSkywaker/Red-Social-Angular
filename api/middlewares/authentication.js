'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');

exports.ensureAuth = function(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: "la peticion no tiene la cabecera de autenticacion" })
    }
    let token = req.headers.authorization.replace(/["']+/g, '')

    try {
        var payload = jwt.decode(token, SECRETA)
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'El token ha expirado' })
        }

    } catch (ex) {
        return res.status(404).send({ message: 'El token no es válido' })
    }

    req.user = payload;

    next();
}