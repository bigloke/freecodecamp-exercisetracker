'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20,'username to long']
    },
    _id: {
        index: true,
        type: String,
        default: mongoose.Types.ObjectId()
    }
});

module.exports = mongoose.model('usuario', userSchema);