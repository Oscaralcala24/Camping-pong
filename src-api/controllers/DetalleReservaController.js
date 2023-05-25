const DetalleReserva = require('../models/DetalleReserva');



const addDetalleReserva = async function (req, res) {
    let detalleReservaAux = new DetalleReserva({
        id_reserva: req.body.id_reserva,
        detalle :[]
    })
    console.log(req.body.detalle);
    for (let index = 0; index < req.body.detalle.length; index++) {
        console.log(req.body.detalle[index]);
        detalleReservaAux.detalle.push(req.body.detalle[index])
    }
    console.log(detalleReservaAux);
    try {
        consulta = await DetalleReserva.create(detalleReservaAux).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};

const getDetalleReserva = async function (req, res) {
    try {
        consulta = await DetalleReserva.create(detalleReservaAux).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};


module.exports = {
    addDetalleReserva,
    getDetalleReserva
};