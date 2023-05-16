var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = mongoose.connection;
const { mostrarParcela } = require('../controllers/ParcelaController');

router.get('/:id', mostrarParcela);

module.exports = router;