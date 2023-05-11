var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Reserva = require('../models/Reserva.js');


var detalleReservaSchema = new Schema({
    id_reserva: [{
        type: String,
        ref: 'Reserva'
    }],
    detalle :[{type: Boolean}]
})


module.exports = mongoose.model('Detalle-Reserva', detalleReservaSchema);