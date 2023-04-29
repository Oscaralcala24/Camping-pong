var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { registrarCamping, mostrarDatosCamping, mostrarCampings } = require('../controllers/CampingController');

/*POST - Crear nuevo camping*/
router.post('/agregarCamping', registrarCamping);
router.get('/allcamping', mostrarCampings);
router.get('/:id', mostrarDatosCamping);



module.exports = router;
