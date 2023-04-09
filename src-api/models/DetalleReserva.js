var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Reserva = require('../models/Reserva.js');


var detalleReservaSchema = new Schema({
    id_reserva: [{
        type: Schema.ObjectId,
        ref: 'Reserva'
    }],
    detalle :[{type: Boolean}]
})


module.exports = mongoose.model('Precio', precioSchema);