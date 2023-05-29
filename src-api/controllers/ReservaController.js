const Reserva = require('../models/Reserva');
const Precio = require('../models/Precio');
const DetalleReserva = require('../models/DetalleReserva');
const schedule = require('node-schedule');

const addReserva = async function (req, res) {
    
    try {
        let reservaAux = new Reserva({
            id_camping: req.body.id_camping,
            id_usuario: req.body.id_usuario,
            id_parcela: req.body.id_parcela,
            fecha_entrada: req.body.fecha_entrada,
            fecha_salida: req.body.fecha_salida,
    
        })
        consulta = await Reserva.create(reservaAux).exec()

        if (consulta) {
            console.log(consulta);
            console.log(consulta._id);
            let detalleReservaAux = new DetalleReserva({
                id_reserva: consulta._id,
                detalle : req.body.detalleReserva
            })
            await DetalleReserva.create(detalleReservaAux).exec()
            const job = schedule.scheduleJob(reservaAux.fecha_salida, async function () {
                const reserva = await Reserva.findOne({ _id: consulta._id }).exec();
            if (reserva.estado !== 'Cancelado') {
                await Reserva.updateOne({ _id: consulta._id }, { estado: 'Finalizado' }).exec();
            }
            });
        }
        res.status(200).json(
            "Reserva realizada con exito"
        );
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
const cancelarReserva = async function (req, res) {
    const id = req.params.id

    try {
        await Reserva.updateOne({ _id: id }, { estado: req.body.estado }).exec()
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
        await Reserva.updateOne({ _id: id }, { valoracion: req.body.valoracion }).exec()
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
    console.log(fechaIni);
    console.log(idParcela);
    console.log(fechaFin);
    try {
        console.log(req);
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