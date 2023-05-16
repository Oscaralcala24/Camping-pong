var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { mostrarServicios } = require('../controllers/ServicesController');

router.get('/:id', mostrarServicios);

module.exports = router;