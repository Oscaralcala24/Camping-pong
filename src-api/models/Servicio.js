var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');

var servicioSchema = new Schema({
    id_camping: {
        type: String,
        ref: 'Camping'
    },
    
    servicios_disponibles: [{
        nombre: String, 
        disponible: Boolean 
    }]
})

module.exports = mongoose.model('Servicio', servicioSchema);