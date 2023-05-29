var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const {  getDetalleReserva } = require('../controllers/DetalleReservaController');

router.get('/getDetalleReserva', getDetalleReserva);

module.exports = router;