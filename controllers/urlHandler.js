'use strict';

var usuario = require('../models/users.js');
var mongoose = require('mongoose');

exports.addUser = function (req, res) {
    var username = req.body.username.toString().trim();
    if (username.length == 0) {
        res.json({ "ERROR!": "EMPTY USERNAME" });
    } else {
        res.json({ "OK": username });
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
    usuario.find({}, function(err, users) {
        var arrayUsers = {};
        users.forEach(function(user) {
            arrayUsers[user._id] = user;
        });
        res.json({arrayUsers});
    });
    
    // res.json({"OK":"DEVOLVIENDO LOS USUARIOS POR CONSOLA"});
};

