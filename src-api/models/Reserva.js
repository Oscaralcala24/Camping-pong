var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');
var Usuario = require('../models/Usuario.js');
var Parcela = require('../models/Parcela.js');

var reservaSchema = new Schema({
    id_camping: [{
        type: Schema.ObjectId,
        ref: 'Camping'
    }],
    id_usuario: [{
        type: Schema.ObjectId,
        ref: 'Usuario'
    }],
    id_parcela: [{
        type: Schema.ObjectId,
        ref: 'Parcela'
    }],
    fecha_pago: { type: Date, default: Date.now()},
    fecha_entrada: { type: Date, required: true},
    fecha_salida: { type: Date, required: true},
    estado: {
        type: String,
        enum: ['Pendiente', 'Cancelado', 'Finalizado'],
        default: 'Pendiente'
    }
})


module.exports = mongoose.model('Precio', precioSchema);