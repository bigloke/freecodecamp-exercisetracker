'use strict';

var usuario = require('../models/users.js');
var ejercicio = require('../models/exercises.js');
var mongoose = require('mongoose');

exports.addUser = function (req, res) {
    var username = req.body.username.toString().trim();
    if (username.length == 0) {
        res.json({ "ERROR": "EMPTY USERNAME" });
    } else {
        const user = new usuario({'username':username});
        user.save((err, usuarioGuardado) => {
        if(err)
        {
            if (err.code == '11000') {
                res.json({ "ERROR": 'DUPLICATE USER' });
            } else {
                res.json({ "ERROR": err.errmsg });
            }
        } else {
            res.json({"OK":usuarioGuardado});
        }
        });
    }
};



exports.fillOne = function (req, res) {
    var user1 = new usuario({
        username: 'bigloke',
    })
    user1.save(function (err) {
        if (err) return (err);
    });
    res.json({"OK": "ES LO QUE HAY"});
};

exports.getAllUsers = function (req, res) {
    usuario.find({}, (err, users) => {
        if (err) res.json({ "ERROR": err.errmsg });
        res.json(users);
    });
};

exports.getAllExercises = function (req, res) {
    ejercicio.find({}, (err, ejercicio) => {
        if (err) res.json({ "ERROR": err.errmsg });
        res.json(ejercicio);
    });
};

exports.cleanAll = function (req, res) {
    usuario.remove({}, function (err, count) {
        if (err) return res.json({ "ERROR": err.errmsg });
        res.json({ "Num of deleted elements": count.result.n });
    });

};

exports.addExercise = function (req, res) {
    usuario.findById(req.body.userId, (err, user) =>{
        if (err) return res.json({ "ERROR": err.errmsg });
        if (!user) return res.status(400).send({ 'ERROR': 'USER NOT FOUND' });

        const exercise = new ejercicio(req.body);
        exercise.username = user.username;
        exercise.date = new Date().toDateString();
        exercise.save((err, savedExercise) => {
            if (err) return res.json({ "ERROR": err.errmsg });
            res.json(savedExercise)
        });

    });
};

exports.getExercise = function (req, res) {
    usuario.findById(req.query.userId, (err, user) => {
        if (err) return res.json({ "ERROR": err.errmsg });
        if (!user) return res.status(400).send({ 'ERROR': 'USER NOT FOUND' });
    
    console.log('User found');
    const from = new Date(req.query.from);
    const to = new Date(req.query.to);
    ejercicio.find({
        userId: req.query.userId,
        date: {
            $lt: to != 'Invalid Date' ? to.getTime() : Date.now(),
            $gt: from != 'Invalid Date' ? from.getTime() : 0
        },

    }, {
            __v: 0,
            _id: 0
    }).sort('-date')
    .limit(parseInt(req.query.limit))
    .exec((err, exercises) => {
        if (err) return res.json({ "ERROR": err.errmsg });
        res.json(exercises);
    })
    });
    // res.json({ "ERROR": 'ALGO NO RULA' });
};
