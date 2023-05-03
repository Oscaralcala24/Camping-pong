var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { registrarCamping, mostrarDatosCamping, mostrarCampings, mejoresCamping, getCiudades } = require('../controllers/CampingController');

/*POST - Crear nuevo camping*/
router.post('/agregarCamping', registrarCamping);
router.get('/listaCampings', mostrarCampings);
router.get('/mejoresCamping', mejoresCamping);
router.get('/ciudadesDisponibles', getCiudades);
router.get('/:id', mostrarDatosCamping);



module.exports = router;
