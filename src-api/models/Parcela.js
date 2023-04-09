var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');
var Usuario = require('../models/Usuario.js');

var parcelaSchema = new Schema({
    id_camping: [{
        type: String,
        ref: 'Camping'
    }],
    num_parcela: { type: Number, required: true },
    tamaño:{
        type: String,
        enum: ['Pequeña', 'Mediana', 'Grande'],
        required: true
    }
})
parcelaSchema.index({ id_camping: 1, num_parcela: 1}, { unique: true });
module.exports = mongoose.model('Parcela', parcelaSchema);