var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { addReserva , getReservas,cancelarReserva,comprobarReserva,valorarReserva } = require('../controllers/ReservaController');

router.get('/getReservas',validationToken, getReservas);
router.put('/cancelarReserva/:id',validationToken, cancelarReserva);
router.put('/valorar/:id',validationToken, valorarReserva);
router.post('/checkReserva', comprobarReserva);
router.post('/anadirReserva', addReserva);

module.exports = router;