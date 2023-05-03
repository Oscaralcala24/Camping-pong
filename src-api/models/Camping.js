var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;


var campingSchema = new Schema({
    _id: { type: String, required: true},
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true},
    region: { type: String, required: true },
    ciudad: { type: String, required: true },
    ubicacion: { type: String, required: true },
    valoracion: { type: Number,default: 0},
    telefono: { type: Number, required: true },
    email: { type: String, required: true }
})

module.exports = mongoose.model('Camping', campingSchema);