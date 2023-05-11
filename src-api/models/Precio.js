var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var Camping = require('../models/Camping.js');

var precioSchema = new Schema({
    temporada: {
        type: String,
        enum: ['Baja', 'Media', 'Alta'],
        required: true
    },
    id_camping: {
        type:String,
        ref: 'Camping',
        default: null
    },
    fecha_inicio: { type: Date, required: true},
    fecha_fin: { type: Date, required: true},
    detalle_precio: [{ type: String, required: true }]
})

precioSchema.index({ temporada: 1, id_camping: 1, _id:1}, { unique: true });

module.exports = mongoose.model('Precio', precioSchema);