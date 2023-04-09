var express = require('express');
var router = express.Router();
const { registrarCamping } = require('../controllers/CampingController');

/*POST - Crear nuevo camping*/
router.post('/agregarCamping', registrarCamping);

module.exports = router;
