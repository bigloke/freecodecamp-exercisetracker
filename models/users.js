'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: {type: String, required: true }
});

module.exports = mongoose.model('usuario', userSchema);