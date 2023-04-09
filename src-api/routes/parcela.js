var express = require('express');
var router = express.Router();
const Parcela = require('../models/Parcela');

/*POST - Crear nuevo parcela*/
router.post('/agregarCamping', function (req, res, next) {
  Camping.create(req.body, function (err, pedidoinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});