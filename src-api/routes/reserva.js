var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const validationToken = require('./../middleware/ValidacionToken')
const { addReserva,getReservas,deleteReserva } = require('../controllers/ReservaController');

router.post('/addReserva',validationToken, addReserva);
router.get('/getReservas',validationToken, getReservas);
router.delete('/deleteReserva/:id',validationToken, deleteReserva);

module.exports = router;