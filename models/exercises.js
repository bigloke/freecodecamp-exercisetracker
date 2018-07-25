'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
    userId: {
        type: String,
        ref:'usuario',
        index: true
    },
    description: {
        type: String,
        required: true,
        maxlength: [20, 'Description too long']
    },
    duration: {
        type: Number,
        required: true,
        min: [1,'To short']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ejercicio', ExercisesSchema);