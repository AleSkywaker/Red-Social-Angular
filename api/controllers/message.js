'use strict'

const moment = require('moment')
const mongoosePaginate = require('mongoose-pagination')

const User = require('../models/user')
const Follow = require('../models/follow')
const Message = require('../models/message')

function saveMessage(req, res) {
    let params = req.body;

    if (!params.text || !params.receiver) { res.status(200).send({ message: `Envia los campos necesarios` }) }

    let message = new Message();
    message.emiter = req.user.sub;
    message.receiver = params.receiver;
    message.text = params.text;
    message.create_at = moment().unix();

    message.save((err, messageStored) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!messageStored) return res.status(404).send({ message: "Error el enviar el mensaje" })
        return res.status(200).send({ message: messageStored })
    })
}

module.exports = {
    saveMessage
}