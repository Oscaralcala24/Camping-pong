var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const validationToken = require('./../middleware/ValidacionToken')
const { registrarUsuario, mostrarUsuarios, loginUsuario, mostrarDatosUsuario, loginUsuarioAdministrador,updateUser,
    updatePassword, deleteUser,generateRandomPassword } = require('../controllers/UsersController');
var db = mongoose.connection;



// POST - Crear un nuevo usuario y validación lado servidor
// router.post('/registrarUsuario', registrarUsuario);


// POST - Crear un nuevo usuario y validación lado servidor
router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/loginAdmin', loginUsuarioAdministrador);
router.get('/listaUsuarios',validationToken , mostrarUsuarios);
router.get('/:id',validationToken , mostrarDatosUsuario);
router.put('/updateUser/:id', validationToken, updateUser);
router.put('/generarContrasena', generateRandomPassword);
router.put('/updatePassword/:id', validationToken, updatePassword);
router.delete('/borrar/:id', validationToken, deleteUser);

module.exports = router;