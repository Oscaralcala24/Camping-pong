require('dotenv').config();
const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('Conexion Base de Datos establecida'))
  .catch((err) => console.error(err));
  
var db = mongoose.connection;
var campingRouter = require('./routes/camping');
// var detalleReservaRouter = require('./routes/detalleReserva');
// var parcelaRouter = require('./routes/parcela');
// var precioRouter = require('./routes/precio');
// var reservaRouter = require('./routes/reserva');
// var servicioRouter = require('./routes/servicio');
var usuarioRouter = require('./routes/usuarios');

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/usuarios', usuarioRouter);
// app.use('/servicio', servicioRouter);
// app.use('/reserva', reservaRouter);
// app.use('/precio', precioRouter);
// app.use('/parcela', parcelaRouter);
// app.use('/detalleReserva', detalleReservaRouter);
app.use('/camping', campingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
