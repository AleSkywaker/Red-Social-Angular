'use strict'

const path = require('path');
const fs = require('fs');
const mongoosePaginate = require('mongoose-pagination')

const User = require('../models/user')
const Follow = require('../models/follow')

function saveFollow(req, res) {
    let params = req.body;

    let follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save((err, followStored) => {
        if (err) return res.status(500).send({ message: 'Error al guardar el seguimiento' });

        if (!followStored) return res.status(500).send({ message: 'El seguimiento no se ha guardado' });

        return res.status(200).send({ follow: followStored })
    })
}

function deleteFollow(req, res) {
    let userId = req.user.sub;
    let followId = req.params.id;

    Follow.find({ 'user': userId, 'followed': followId }).remove(err => {
        if (err) return res.status(500).send({ message: 'Error el dejar de seguir' })

        return res.status(200).send({ message: 'El follow se ha eliminado!!' })
    })
}

function getFollowingUsers(req, res) {
    let userId = req.user.sub;

    if (req.params.id && req.params.page) {
        userId = req.params.id;
    }

    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }

    let itemsPerPage = 3;

    Follow.find({ user: userId }).populate({ path: 'followed' }).paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!follows) return res.status(404).send({ message: 'No estas siguiendo a ningun usuario' })
        followUserIds(req.user.sub).then((value) => {
            return res.status(200).send({
                total: total,
                pages: Math.ceil(total / itemsPerPage),
                follows,
                users_following: value.following,
                users_follow_me: value.followed
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

function getFollwedUsers(req, res) {
    let userId = req.user.sub;

    if (req.params.id && req.params.page) {
        userId = req.params.id;
    }

    let page = 1;

    if (req.params.page) {
        page = req.params.page;
    } else {
        page = req.params.id;
    }

    let itemsPerPage = 5;

    Follow.find({ followed: userId }).populate('user').paginate(page, itemsPerPage, (err, follows, total) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!follows) return res.status(404).send({ message: 'No te sigue ningun usuario' })


        followUserIds(req.user.sub).then((value) => {
            return res.status(200).send({
                total: total,
                pages: Math.ceil(total / itemsPerPage),
                follows,
                users_following: value.following,
                users_follow_me: value.followed
            })
        })

    })
}
//Devolver listado de usuarios
function geFollows(req, res) {
    let userId = req.user.sub;

    let find = Follow.find({ user: userId })

    if (req.params.followed) {
        let find = Follow.find({ followed: userId })
    }

    find.populate('user followed').exec((err, follows) => {
        if (err) return res.status(500).send({ message: 'Error en el servidor' })
        if (!follows) return res.status(404).send({ message: 'No sigues a ningun usuario' })
        return res.status(200).send({ follows })
    })
}


module.exports = {
    saveFollow,
    deleteFollow,
    getFollowingUsers,
    getFollwedUsers,
    geFollows
}