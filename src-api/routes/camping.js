var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { registrarCamping, mostrarDatosCamping, mostrarCampings, mejoresCamping, getCiudades,deleteCamping,modificarCamping } = require('../controllers/CampingController');
const uploadFile = require('../middleware/multer')

router.post('/agregarCamping', uploadFile.upload, registrarCamping);
router.put('/modificarCamping/:id', modificarCamping);
router.get('/listaCampings', mostrarCampings);
router.get('/mejoresCamping', mejoresCamping);
router.get('/ciudadesDisponibles', getCiudades);
router.get('/:id', mostrarDatosCamping);
router.delete('/borrar/:id', deleteCamping);



module.exports = router;
