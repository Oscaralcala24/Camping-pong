var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;

var campingSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true},
    region: { type: String, required: true },
    ciudad: { type: String, required: true },
    ubicacion: { type: String, required: true },
    valoracion: { type: Number,default: 0},
    imagenes: { type:[String]},
    telefono: { type: Number, required: true },
    email: { type: String, required: true }
})

campingSchema.methods.setImg = function setImg(files) {

    const url ="http://localhost:3000/uploads/";
    for (let i = 0; i < files.length; i++) {
        this.imagenes.push(url+files[i].filename);
    }
}

module.exports = mongoose.model('Camping', campingSchema);