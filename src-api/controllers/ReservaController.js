const Reserva = require('../models/Reserva');
const Precio = require('../models/Precio');
const DetalleReserva = require('../models/DetalleReserva');
const schedule = require('node-schedule');
const Camping = require('../models/Camping');

const addReserva = async function (req, res) {
    
    try {
        let reservaAux = new Reserva({
            id_camping: req.body.id_camping,
            id_usuario: req.body.id_usuario,
            id_parcela: req.body.id_parcela,
            fecha_entrada: new Date(req.body.fecha_entrada),
            fecha_salida: new Date(req.body.fecha_salida),
    
        })
        console.log(reservaAux);
        let fechaAux = new Date()
    
        let consulta = await Reserva.create(reservaAux)
        if (consulta) {
            console.log(consulta);
            console.log(consulta._id);
            let detalleReservaAux = new DetalleReserva({
                id_reserva: consulta._id,
                detalle : req.body.detalleReserva
            })
            await DetalleReserva.create(detalleReservaAux)
        }
        res.status(200).json(
            "Reserva realizada con exito"
        );
    } catch (err) {
        res.status(404).json("Error al intentar reservar, intentelo de nuevo.")
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
const cancelarReserva = async function (req, res) {
    const id = req.params.id

    try {
        await Reserva.updateOne({ _id: id }, { estado: req.body.estado })
        res.status(200).json(
            "Reserva cancelada correctamente"
        );
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
};

const valorarReserva = async function (req, res) {
    const id = req.params.id
    try {
        await Reserva.updateOne({ _id: id }, { valoracion: req.body.valoracion })
        let consulta = await Reserva.findById({_id: id});
        if (consulta){
            let reservas = await Reserva.find({id_camping: consulta.id_camping,valoracion: { $ne: null }})
            let valoracionMedia = reservas.reduce((sum, reserva) => sum + reserva.valoracion, 0) / reservas.length;
            await Camping.updateOne({_id: consulta.id_camping},{valoracion: valoracionMedia})
        }
        res.status(200).json(
            "Camping valorado correctamente correctamente"
        );
        
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
};

const comprobarReserva = async function (req, res) {
    const fechaIni = req.body.fechaIni
    const fechaFin = req.body.fechaFin
    const idParcela = req.body.id_parcela
    try {
        let consulta = await Reserva.count({
            $and: [
                { fecha_entrada: { $lt: new Date(fechaFin) } },
                { fecha_salida: { $gt: new Date(fechaIni) } },
                { id_parcela: idParcela }
            ]
        }).exec()
        if (consulta > 0) {
            res.status(200).json(
                "Esta parcela ya esta reservada en estas fechas"
            );
        } else {
            res.status(200).json(
                "Parcela seleccionada correctamente"
            );
        }
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};






module.exports = {
    addReserva,
    getReservas,
    cancelarReserva,
    comprobarReserva,
    valorarReserva
};