const DetalleReserva = require('../models/DetalleReserva');



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
    getDetalleReserva
};