var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');
var Usuario = require('../models/Usuario.js');
var Parcela = require('../models/Parcela.js');

var reservaSchema = new Schema({
    id_camping: {
        type: String,
        ref: 'Camping'
    },
    id_usuario: {
        type: String,
        ref: 'Usuario'
    },
    id_parcela: {
        type: String,
        ref: 'Parcela'
    },
    fecha_pago: { type: Date, default: Date.now()},
    fecha_entrada: { type: Date, required: true},
    fecha_salida: { type: Date, required: true},
    estado: {
        type: String,
        enum: ['Pendiente', 'Cancelado', 'Finalizado'],
        default: 'Pendiente'
    }
})


module.exports = mongoose.model('Reserva', reservaSchema);