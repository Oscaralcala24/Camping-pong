const Parcela = require('../models/Parcela');
const Camping = require('./../models/Camping');
const uploadFile = require('../middleware/multer');
const Servicio = require('../models/Servicio');
const Precio = require('../models/Precio');


const registrarCamping = async function (req, res) {
    const dataCamping = new Camping({
        "nombre": req.body.nombre,
        "descripcion": req.body.descripcion,
        "region": req.body.region,
        "ciudad": req.body.ciudad,
        "ubicacion": req.body.ubicacion,
        "telefono": req.body.telefono,
        "email": req.body.email
    })
    console.log(req.files)
    console.log(req.imagenes)
    dataCamping.setImg(req.files);
    try {
        const campingCreado = await Camping.create(dataCamping);
        console.log(JSON.parse(req.body.servicios));
        const dataServices = new Servicio({
            id_camping: campingCreado.id,
            servicios_disponibles: JSON.parse(req.body.servicios)
        })

        for (let index = 0; index < JSON.parse(req.body.serviciosAdicional).length; index++) {
            dataServices.servicios_disponibles.push(JSON.parse(req.body.serviciosAdicional)[index]);

        }
        console.log(dataServices);

        await Servicio.create(dataServices);
        var parcelasArray = [];

        console.log("-------------------COORDENADAS------------------------------");

        JsonParcela = JSON.parse(req.body.parcelas)


        for (let index = 0; index < JsonParcela.length; index++) {
            let coordenadas = JSON.parse(JsonParcela[index].coordenadas);
            console.log(coordenadas);

            let parcelaAux = new Parcela({
                id_camping: campingCreado.id,
                coordenadas: coordenadas,
                tamano: JsonParcela[index].tamano
            })
            console.log(parcelaAux);
            parcelasArray.push(parcelaAux)

        }
        console.log(parcelasArray);

        await Parcela.insertMany(parcelasArray);
        console.log("----------------------------------------FECHAR--------------------------------");


        bajaInicio = new Date(req.body.fechaTBajaInicio)
        bajaIFin = new Date(req.body.fechaTBajaFin)
        mediaInicio = new Date(req.body.fechaTMediaInicio)
        mediaIFin = new Date(req.body.fechaTMediaFin)
        altaInicio = new Date(req.body.fechaTMediaInicio)
        altaIFin = new Date(req.body.fechaTMediaFin)



        var preciosArray = [];
        let precioBaja = new Precio({
            temporada: "Baja",
            id_camping: campingCreado.id,
            fecha_inicio: bajaInicio,
            fecha_fin: bajaIFin,
            detalle_precio: []

        })
        let precioMedia = new Precio({
            temporada: "Media",
            id_camping: campingCreado.id,
            fecha_inicio: mediaInicio,
            fecha_fin: mediaIFin,
            detalle_precio: []

        })
        let precioAlta = new Precio({
            temporada: "Alta",
            id_camping: campingCreado.id,
            fecha_inicio: altaInicio,
            fecha_fin: altaIFin,
            detalle_precio: []

        })
        precios = JSON.parse(req.body.precios)


        for (let index = 0; index < precios.length; index++) {
            console.log(precios[index]);
            precioBaja.detalle_precio.push({ nombre: precios[index].nombre, precio: precios[index].preciobaja })
            precioMedia.detalle_precio.push({ nombre: precios[index].nombre, precio: precios[index].preciomedia })
            precioAlta.detalle_precio.push({ nombre: precios[index].nombre, precio: precios[index].precioalta })
        }
        preciosArray.push(precioBaja)
        preciosArray.push(precioMedia)
        preciosArray.push(precioAlta)
        await Precio.insertMany(preciosArray);

        res.status(200).json({ status: "Ingresado correctamente" })




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


const mostrarCampings = async function (req, res) {

    try {

        consulta = await Servicio.find().populate("id_camping").sort({ valoracion: -1 }).exec()
        const filters = req.query;
        console.log(filters);
        const filteredCamping = consulta.filter(camping => {
            let isValid = true;
            for (key in filters) {
                isValid = isValid && camping.id_camping[key].toLowerCase() == filters[key];
            }
            return isValid;
        });
        console.log(filteredCamping)
        res.status(200).json({
            filteredCamping
        });
    } catch (err) {
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

const deleteCamping = async function (req, res) {
    console.log(req.params.id);
    try {
        let consulta = await Camping.deleteOne({ "_id": req.params.id }).exec()
        if (consulta.deletedCount === 1) {
            await Servicio.deleteOne({ "id_camping": req.params.id }).exec()
            await Parcela.deleteMany({ "id_camping": req.params.id }).exec()
            res.status(200).json(
                "Camping borrado con exito"
            );
        } else {
            res.json(
                "El camping no se ha podido eliminar"
            );
        }

    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
}
const modificarCamping = async function (req, res) {
    
    const dataCamping = {
        "nombre": req.body.nombre,
        "descripcion": req.body.descripcion,
        "region": req.body.region,
        "ciudad": req.body.ciudad,
        "ubicacion": req.body.ubicacion,
        "telefono": req.body.telefono,
        "email": req.body.email
    }
    console.log(req.body);
    console.log(typeof(req.body.fechaTBajaInicio));
    console.log(req.body.fechaTBajaFin);
    console.log(req.body.fechaTMediaInicio);
    console.log(req.body.fechaTMediaFin);
    console.log(req.body.fechaTAltaInicio);
    console.log(req.body.fechaTAltaFin);
    try {
        await Camping.findByIdAndUpdate(req.params.id, dataCamping)
        await Precio.updateOne({$and: [{ id_camping: req.params.id },{ temporada: "Baja" }]}, {$set: {fecha_inicio: new Date(req.body.fechaTBajaInicio),fecha_fin: new Date(req.body.fechaTBajaFin)}})
        await Precio.updateOne({$and: [{ id_camping: req.params.id },{ temporada: "Media" }]}, {$set: {fecha_inicio: new Date(req.body.fechaTMediaInicio),fecha_fin: new Date(req.body.fechaTMediaFin)}})
        await Precio.updateOne({$and: [{ id_camping: req.params.id },{ temporada: "Alta" }]}, {$set: {fecha_inicio: new Date(req.body.fechaTAltaInicio),fecha_fin: new Date(req.body.fechaTAltaFin)}})
        res.status(200).json(
            "Camping actualizado con exito"
        );


    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }
}







module.exports = {
    registrarCamping,
    mostrarDatosCamping,
    mostrarCampings,
    mejoresCamping,
    getCiudades,
    deleteCamping,
    modificarCamping
};