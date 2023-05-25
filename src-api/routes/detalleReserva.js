var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { addDetalleReserva, getDetalleReserva } = require('../controllers/DetalleReservaController');

router.post('/addDetalleReserva', addDetalleReserva);
router.get('/getDetalleReserva', getDetalleReserva);

module.exports = router;