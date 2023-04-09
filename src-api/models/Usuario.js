var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = mongoose.connection;
var bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;


var usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    apellidos: { type: String, required: true },
    dni: {
        type: String, required: true, index: { unique: true }
    },
    nickname: {
        type: String, required: true, index: { unique: true }
    },
    email: {
        type: String, required: true, index: { unique: true }
    },
    contrasena: { type: String, required: true },
    telefono: { type: Number, required: true },
    role: {
        type: String,
        enum: ['administrador', 'usuario_registrado'],
        default: 'usuario_registrado'
    }
})

// Contraseña
usuarioSchema.pre('save', function (next) {
    var user = this;
    // solo aplica una función hash al password si ha sido modificado (o es nuevo)
    if (!user.isModified('contrasena')) return next();
    // genera la salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // aplica una función hash al password usando la nueva salt
        bcrypt.hash(user.contrasena, salt, function (err, hash) {
            if (err) return next(err);
            // sobrescribe el password escrito con el “hasheado”
            user.contrasena = hash;
            next();
        });
    });
});

usuarioSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword,
        this.contrasena,
        function (err,
            isMatch) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
};

module.exports = mongoose.model('Usuario', usuarioSchema);