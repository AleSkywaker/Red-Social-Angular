'use strict'
const bcrypt = require('bcrypt-nodejs');
const mongoosePaginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');

const User = require('../models/user');
const Follow = require('../models/follow');
const jwt = require('../services/jwt');
const Publication = require('../models/publication');

function home(req, res) {
    res.status(200).send({
        mensaje: "Hola Alex Sandro"
    })
}

function pruebas(req, res) {
    res.status(200).send({
        mensaje: "Hola Alex Sandro desde pruebas"
    })
}

function saveUser(req, res) {
    let params = req.body;
    let user = new User();

    if (params.password === params.password2) {

        if (params.name && params.surname && params.nick && params.email && params.password) {
            user.name = params.name;
            user.surname = params.surname;
            user.nick = params.nick;
            user.email = params.email;
            user.role = 'ROLE_USER';
            user.image = null;

            // Controlar usuarios duplicados
            User.find({
                $or: [{
                        email: user.email.toLowerCase()
                    },
                    {
                        nick: user.nick.toLowerCase()
                    }
                ]
            }).exec((err, users) => {
                if (err) return res.status(500).send({
                    message: 'Error en paticion de usuario'
                })

                if (users && users.length >= 1) {
                    return res.status(200).send({
                        message: 'Ya existe un usuario con este email o nick'
                    })
                } else {
                    // Cifra la contraseña y guarda los datos
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        user.save((err, userStored) => {
                            if (err) return res.status(500).send({
                                message: 'Error al guardar el usuario'
                            });

                            if (userStored) {
                                userStored.password = ";)";
                                res.status(200).send({
                                    user: userStored
                                })
                            } else {
                                res.status(404).send({
                                    message: 'So se ha registrado el usuario'
                                })
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
    } else {
        res.status(200).send({
            message: 'Las contraseñas no son iguales'
        })
    }
}


function loginUser(req, res) {
    let params = req.body;

    let email = params.email;
    let password = params.password;

    User.findOne({
        email: email
    }, (err, user) => {
        if (err) return res.status(500).send({
            message: "Error en la peticion"
        });


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
                        return res.status(200).send({
                            user
                        })
                    }

                } else {
                    return res.status(404).send({
                        message: "El usuario no se ha podido logear"
                    });
                }
            })

        } else {
            return res.status(404).send({
                message: "No hemos encontrado este usuario en la base de datos!!"
            });
        }
    })
}

//Conseguir datos de un usuario
function getUser(req, res) {
    var userId = req.params.id; // Cuando recibimos datos por url usamos params, cuando lo hacemos por post o put usamos body

    User.findById(userId, (err, user) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        })

        if (!user) return res.status(404).send({
            message: 'usuario no existe'
        })

        followThisUser(req.user.sub, userId).then((value) => {
            user.password = undefined;
            return res.status(200).send({
                user,
                following: value.following,
                followed: value.followed
            })
        })
    })
}

async function followThisUser(identity_user_id, user_id) {
    var following = await Follow.findOne({
            "user": identity_user_id,
            "followed": user_id
        }).exec()
        .then((following) => {
            return following;
        })
    var followed = await Follow.findOne({
            "user": user_id,
            "followed": identity_user_id
        }).exec()
        .then((followed) => {
            return followed
        })
    return {
        following: following,
        followed: followed
    }
}

function getUsers(req, res) {

    let identity_user_id = req.user.sub;

    let page = 1;
    if (req.params.page) {
        page = req.params.page
    }

    let itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {
        if (err) return res.status(500).send({
            message: 'Error en la peticion'
        })

        if (!users) return res.status(404).send({
            message: 'No hay usuarios disponibles'
        })

        followUserIds(identity_user_id).then((value) => {

            return res.status(200).send({
                users,
                users_following: value.following,
                users_follow_me: value.followed,
                total,
                pages: Math.ceil(total / itemsPerPage)
            })
        })
    })
}

async function followUserIds(user_id) {
    var following = await Follow.find({
            "user": user_id
        }).select({
            '_id': 0,
            '__V': 0,
            'user': 0
        }).exec()
        .then((follow) => {
            var follows_clean = []
            follow.forEach((f) => {
                follows_clean.push(f.followed)
            })
            return follows_clean
        })
    var followed = await Follow.find({
            "followed": user_id
        }).select({
            '_id': 0,
            '__V': 0,
            'followed': 0
        }).exec()
        .then((follow) => {
            var follows_clean = []
            follow.forEach((f) => {
                follows_clean.push(f.user)
            })
            return follows_clean
        })

    return {
        following: following,
        followed: followed
    }
}

function getCounters(req, res) {
    var userId = req.user.sub;
    if (req.params.id) {
        userId = req.params.id;
    }
    getCountFollow(userId).then((value) => {
        return res.status(200).send(value);
    })
}

async function getCountFollow(user_id) {
    let following = await Follow.count({
            "user": user_id
        }).exec()
        .then((count) => {
            return count;
        })
    let followed = await Follow.count({
            "followed": user_id
        }).exec()
        .then((count) => {
            return count;
        })
    let publications = await Publication.count({
            "user": user_id
        }).exec()
        .then((count) => {
            return count;
        })

    return {
        following: following,
        followed: followed,
        publications: publications
    }
}

function updateUser(req, res) {
    let userId = req.params.id;
    let update = req.body;

    //borrar propiedad password
    delete update.password;

    if (userId != req.user.sub) {
        return res.status(500).send({
            message: 'No tiene permisos para actualizar los datos del usuario'
        })
    }

    User.find({
        $or: [{
                email: update.email.toLowerCase()
            },
            {
                nick: update.nick.toLowerCase()
            }
        ]
    }).exec((err, users) => {
        var user_isset = false;
        users.forEach((user) => {
            if (user && user._id != userId) user_isset = true;
        })
        if (user_isset) return res.status(404).send({
            message: 'Los datos ya estan en uso'
        })
        User.findByIdAndUpdate(userId, update, {
            new: true
        }, (err, userUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })

            if (!userUpdated) return res.status(404).send({
                message: 'No se ha podido actualizar el usuario'
            })

            return res.status(200).send({
                user: userUpdated
            })
        })
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
            return removeFilesOfUploads(res, file_path, 'No tienes permisos para actualizar los datos de usuario')
        }
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            //actualizar documento usuario logeado
            User.findByIdAndUpdate(userId, {
                image: file_name
            }, {
                new: true
            }, (err, userUpdated) => {
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })

                if (!userUpdated) return res.status(404).send({
                    message: 'No se ha podido actualizar el usuario'
                })

                return res.status(200).send({
                    user: userUpdated
                })

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
    let path_file = './uploads/users/' + image_file;

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
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getCounters,
    updateUser,
    uploadImage,
    getImages
}