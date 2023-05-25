const Reserva = require('../models/Reserva');
const Precio = require('../models/Precio');
const DetalleReserva = require('../models/DetalleReserva');

const addReserva = async function (req, res) {
    let reservaAux = new Reserva({
        id_camping: req.body.id_camping,
        id_usuario: req.body.id_usuario,
        id_parcela: req.body.id_parcela,
        fecha_entrada: req.body.fecha_entrada,
        fecha_salida: req.body.fecha_salida,

    })
    try {
        consulta = await Reserva.create(reservaAux).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};

const getReservas = async function (req, res) { 
    try {
        consulta = await DetalleReserva.find().populate("id_reserva").exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};
const deleteReserva = async function (req, res) { 
    const id = req.params.id
    console.log(id);
    try {
        await Reserva.deleteOne({_id:id}).exec()
        await DetalleReserva.deleteOne({id_reserva:id}).exec()
        res.status(200).json(
            "Reserva cancelada correctamente"
        );
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};






module.exports = {
    addReserva,
    getReservas,
    deleteReserva
};