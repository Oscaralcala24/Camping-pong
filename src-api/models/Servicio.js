var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');

var servicioSchema = new Schema({
    id_camping: [{
        type: Schema.ObjectId,
        ref: 'Camping'
    }],
    servicios_disponibles: [{ type: Boolean }]
})

module.exports = mongoose.model('Precio', precioSchema);