var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const validationToken = require('./../middleware/ValidacionToken')
const { registrarUsuario, mostrarUsuarios, loginUsuario, mostrarDatosUsuario } = require('../controllers/UsersController');
var db = mongoose.connection;



// POST - Crear un nuevo usuario y validación lado servidor
// router.post('/registrarUsuario', registrarUsuario);


// POST - Crear un nuevo usuario y validación lado servidor
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/listaUsuarios',validationToken , mostrarUsuarios);
router.get('/:id',validationToken , mostrarDatosUsuario);

module.exports = router;