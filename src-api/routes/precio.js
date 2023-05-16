var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { mostrarPrecios } = require('../controllers/PreciosController');

router.get('/:id', mostrarPrecios);

module.exports = router;