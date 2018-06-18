'use strict'

const path = require('path')
const fs = require('fs')
const moment = require('moment')
const mongoosePaginate = require('mongoose-pagination')
const Publication = require('../models/publication')
const User = require('../models/user')
const Follow = require('../models/follow')

function savePublication(req, res) {
    let params = req.body;

    if (!params.text) return res.status(200).send({
        message: "Debes enviar un texto"
    })

    let publication = new Publication();
    publication.text = params.text;
    publication.file = "null";
    publication.user = req.user.sub;
    publication.create_at = moment().unix()

    publication.save((err, publicationStored) => {
        if (err) return res.status(500).send({
            message: "Error al guardar publication"
        })
        if (!publicationStored) return res.status(404).send({
            message: "La publicacion no ha sido guardada"
        })
        return res.status(200).send({
            publication: publicationStored
        })
    })
}

function getPublications(req, res) {

    let page = 1;
    if (req.params.page) {
        page = req.params.page;
    }

    let itemsPerPage = 4;

    Follow.find({
        user: req.user.sub
    }).populate('followed').exec((err, follows) => {
        if (err) return res.status(500).send({
            message: "Error al devolver los seguidores"
        })

        let followsClean = []
        follows.forEach((follow) => {
                followsClean.push(follow.followed)
            })
            //mostrar mis porpias publicaciones
        followsClean.push(req.user.sub);
        Publication.find({
                user: {
                    "$in": followsClean
                }
            }).sort('-create_at').populate('user')
            .paginate(page, itemsPerPage, (err, publications, total) => {
                if (err) return res.status(500).send({
                    message: "Error al devolver publicaciones"
                })
                if (!publications) return res.status(404).send({
                    message: 'No hay publicaciones'
                })
                return res.status(200).send({
                    total_items: total,
                    pages: Math.ceil(total / itemsPerPage),
                    page: page,
                    items_per_page: itemsPerPage,
                    publications
                })
            })
    })
}

function getPublication(req, res) {
    let publicationId = req.params.id;

    Publication.findById(publicationId, (err, publication) => {
        if (err) return res.status(500).send({
            message: "Error al devolver publicacion"
        })
        if (!publication) return res.status(404).send({
            message: 'No existe la publicacion'
        })
        return res.status(200).send({
            publication
        })
    })
}

function deletePublication(req, res) {
    let publicationId = req.params.id;

    Publication.find({
        "user": req.user.sub,
        "_id": publicationId
    }).remove((err) => {
        if (err) return res.status(500).send({
            message: "Error al eliminar publicacion"
        })
        return res.status(200).send({
            message: "La publicacion ha sido eliminada"
        })
    })
}

function uploadImage(req, res) {
    let publicationId = req.params.id;

    if (req.files) {
        let file_path = req.files.image.path;
        console.log(file_path);
        let file_split = file_path.split('\\')
        console.log(file_split);
        let file_name = file_split[2];
        console.log(file_name);
        let ext_split = file_name.split('\.')
        console.log(ext_split);
        let file_ext = ext_split[1]
        console.log(file_ext);

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {

            Publication.findOne({
                'user': req.user.sub,
                '_id': publicationId
            }).exec((err, publication) => {
                if (publication) {
                    //actualizar documento de la publicaion
                    Publication.findByIdAndUpdate(publicationId, {
                        file: file_name
                    }, {
                        new: true
                    }, (err, publicationUpdated) => {
                        if (err) return res.status(500).send({
                            message: 'Error en la peticion'
                        })
                        if (!publicationUpdated) return res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                        })
                        return res.status(200).send({
                            publication: publicationUpdated
                        })
                    })
                } else {
                    return removeFilesOfUploads(res, file_path, 'No tiene permisos para actualizar el fichero')
                }
            })
        } else {
            return removeFilesOfUploads(res, file_path, 'Extensión no válida')
        }
    } else {
        return res.status(200).send({
            message: 'No se ha subido imagenes'
        })
    }
}

function removeFilesOfUploads(res, file, message) {
    fs.unlink(file, (err) => {
        return res.status(200).send({
            message: message
        })
    })
}

function getImages(req, res) {
    let image_file = req.params.imageFile;
    let path_file = './uploads/publications/' + image_file;

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({
                message: 'no existe la imagen'
            })
        }
    })
}

module.exports = {
    savePublication,
    getPublications,
    getPublication,
    deletePublication,
    uploadImage,
    getImages
}