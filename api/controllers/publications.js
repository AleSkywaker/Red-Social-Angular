'use strict'

const path = require('path')
const fs = require('fs')
const moment = require('moment')
const mongoosePaginate = require('mongoose-pagination')

const Publication = require('../models/publication')
const User = require('../models/user')
const Follow = require('../models/follow')


function probando(req, res) {
    return res.status(200).send({ message: "Hola Hola" })
}

function savePublication(req, res) {
    let params = req.body;

    if (!params.text) return res.status(200).send({ message: "Debes enviar un texto" })

    let publication = new Publication();
    publication.text = params.text;
    publication.file = "null";
    publication.user = req.user.sub;
    publication.create_at = moment().unix()

    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({ message: "Error al guardar publication" })
        if (!publicationStored) return res.status(404).send({ message: "La publicacion no ha sido guardada" })
        return res.status(200).send({ publication: publicationStored })
    })
}

function getPublications(req, res) {

    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    let itemsPerPage = 4;

    Follow.find({ user: req.user.sub }).populate('followed').exec((err, follows) => {
        if (err) return res.status(200).send({ message: "Error al devolver los seguidores" })

        let followsClean = []
        follows.forEach((follow) => {
            followsClean.push(follow.followed)
        })
        return res.status(200).send({ fo: followsClean })
        console.log(followsClean);
    })
    let userId = req.user.sub;

}

module.exports = {
    probando,
    savePublication,
    getPublications
}