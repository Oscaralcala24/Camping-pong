const Parcela = require('../models/Parcela');
const Camping = require('./../models/Camping');

const registrarCamping = async function (req, res) {
    const dataCamping = {
        "_id": req.body._id,
        "nombre": req.body.nombre,
        "descripcion": req.body.descripcion,
        "region": req.body.region,
        "ciudad": req.body.ciudad,
        "ubicacion": req.body.ubicacion,
        "telefono": req.body.telefono,
        "email": req.body.email
    }
    try {
        await Camping.create(dataCamping)
        res.json({ status: "Ingresado correctamente" })
        var tamano;
        for (let index = 1; index <= req.body.pequena + req.body.mediana + req.body.grande; index++) {
            if (index <= req.body.pequena) {
                tamano = "Pequeña";
            } else if (index <= req.body.pequena + req.body.mediana) {
                tamano = "Mediana";
            } else {
                tamano = "Grande";
            }
            var dataparcela = {
                "id_camping": req.body._id,
                "num_parcela": index,
                "tamaño": tamano
            }

            await Parcela.create(dataparcela)

        }
    } catch (err) {
        console.log(err)
        res.json({ status: "No se ha ingresado correctamente el camping" })
    }

};


const mostrarDatosCamping = async function (req, res) {
    let id = req.params.id;
    try {
        consulta = await Camping.findOne({ _id: id }).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};

//MEjorar eficiencia
const mostrarCampings = async function (req, res) {
    try {
        consulta = await Camping.find().sort({ valoracion: -1 }).exec()
        const filters = req.query;
        const filteredCamping = consulta.filter(camping  => {
            let isValid = true;
            for (key in filters) {
                console.log("prueba")
                console.log(key, camping[key], filters[key]);
                isValid = isValid && camping[key] == filters[key];
            }
            return isValid;
        });
        console.log(filteredCamping)
        res.status(200).json({
            filteredCamping
        });
    }catch (err) {
    res.status(404).json({ status: "error", error: "Error" })
    }
  };

  
const mejoresCamping = async function (req, res) {
    try {
        consulta = await Camping.find().sort({ valoracion: -1 }).limit(4).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
};

const getCiudades = async function (req, res) {
    try {
        consulta = await Camping.find({}, { ciudad: 1 }).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
};







module.exports = {
    registrarCamping,
    mostrarDatosCamping,
    mostrarCampings,
    mejoresCamping,
    getCiudades,
};