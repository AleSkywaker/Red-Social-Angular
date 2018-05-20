'use strict'
const bcrypt = require('bcrypt-nodejs');
const mongoosePaginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');
const User = require('../models/user');
const jwt = require('../services/jwt');

function home(req, res) {
    res.status(200).send({ mensaje: "Hola Alex Sandro" })
}

function pruebas(req, res) {
    res.status(200).send({ mensaje: "Hola Alex Sandro desde pruebas" })
}

function saveUser(req, res) {
    let params = req.body;
    let user = new User();

    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name;
        user.surname = params.surname;
        user.nick = params.nick;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        // Controlar usuarios duplicados
        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick }
            ]
        }).exec((err, users) => {
            if (err) return res.status(500).send({ message: 'Error en paticion de usuario' })

            if (users && users.length >= 1) {
                return res.status(200).send({ message: 'Ya existe un usuario con este email o nick' })
            } else {
                // Cifra la contraseña y guarda los datos
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if (err) return res.status(500).send({ message: 'Error al guardar el usuario' });

                        if (userStored) {
                            res.status(200).send({ user: userStored })
                        } else {
                            res.status(404).send({ message: 'So se ha registrado el usuario' })
                        }
                    })
                })
            }
        })
    } else {
        res.status(200).send({
            message: 'Debes rellenar todo los campos'
        })
    }
}

function loginUser(req, res) {
    let params = req.body;

    let email = params.email;
    let password = params.password;

    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).send({ message: "Error en la peticion" });


        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    //devolver datos de usuario

                    if (params.gettoken) {
                        //generar y devolver token
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        })
                    } else {
                        //devolver datos del usuario
                        user.password = undefined;
                        return res.status(200).send({ user })
                    }

                } else {
                    return res.status(404).send({ message: "El usuario no se ha podido logear" });
                }
            })

        } else {
            return res.status(404).send({ message: "No hemos encontrado este usuario en la base de datos!!" });
        }
    })
}

//Conseguir datos de un usuario
function getUser(req, res) {
    // Cuando recibimos datos por url usamos params, cuando lo hacemos por post o put usamos body

    let userId = req.params.id;

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (!user) return res.status(404).send({ message: 'usuario no existe' })

        return res.status(200).send({ user })
    })
}

function getUsers(req, res) {

    let identity_user_id = req.user.sub;

    let page = 1;
    if (req.params.page) {
        page = req.params.page
    }

    let itemsPerPage = 2;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (!users) return res.status(404).send({ message: 'No hay usuarios disponibles' })

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemsPerPage)
        })
    })
}

function updateUser(req, res) {
    let userId = req.params.id;
    let update = req.body;

    //borrar propiedad password
    delete update.password;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tiene permisos para actualizar los datos del usuario' })
    }
    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
        if (err) return res.status(500).send({ message: 'Error en la peticion' })

        if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' })

        return res.status(200).send({ user: userUpdated })
    })
}

function uploadImage(req, res) {
    let userId = req.params.id;

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

        if (userId != req.user.sub) {
            removeFilesOfUploads(res, file_path, 'No tienes permisos para actualizar los datos de usuario')
        }
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //actualizar documento usuario logeado
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if (err) return res.status(500).send({ message: 'Error en la peticion' })

                if (!userUpdated) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' })

                return res.status(200).send({ user: userUpdated })

            })



        } else {
            removeFilesOfUploads(res, file_path, 'Extensión no válida')
        }
    } else {
        return res.status(200).send({ message: 'No se ha subido imagenes' })
    }
}

function removeFilesOfUploads(res, file, message) {
    fs.unlink(file, (err) => {
        return res.status(200).send({ message: message })
    })
}


module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    uploadImage
}