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
    message.viewed = 'false';

    message.save((err, messageStored) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!messageStored) return res.status(404).send({ message: "Error el enviar el mensaje" })
        return res.status(200).send({ message: messageStored })
    })
}

function getReceivedMessage(req, res) {
    let userId = req.user.sub;
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    let itemsPerPage = 4;
    Message.find({ receiver: userId }).populate('emiter', 'name surname _id nick image').sort('-create_at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!messages) return res.status(404).send({ message: "No hay mensajes" })
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        })
    })
}

function getEmitedMessage(req, res) {
    let userId = req.user.sub;
    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }
    let itemsPerPage = 4;
    Message.find({ emiter: userId }).populate('emiter receiver', 'name surname _id nick image').sort('-create-at').paginate(page, itemsPerPage, (err, messages, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })
        if (!messages) return res.status(404).send({ message: "No hay mensajes" })
        return res.status(200).send({
            total: total,
            pages: Math.ceil(total / itemsPerPage),
            messages
        })
    })
}

function getUnviewedMessages(req, res) {
    let userId = req.user.sub;

    Message.count({ receiver: userId, viewed: 'false' }).exec((err, count) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" })
        return res.status(200).send({
            'unviewed': count
        })
    })
}

function setViewedMessages(req, res) {
    let userId = req.user.sub;

    Message.update({ receiver: userId, viewed: 'false' }, { viewed: "true" }, { "multi": true }, (err, messageUpdated) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" })
        if (!messageUpdated) return res.status(404).send({ message: "No se ha actualiazado el documento" })

        return res.status(200).send({ messages: messageUpdated })
    })
}


module.exports = {
    saveMessage,
    getReceivedMessage,
    getEmitedMessage,
    getUnviewedMessages,
    setViewedMessages
}