const Parcela = require('../models/Parcela');
const Camping = require('./../models/Camping');

const registrarCamping = async function (req, res) {
    const dataCamping ={
        "_id" : req.body._id,
        "nombre": req.body.nombre,
        "region": req.body.region,
        "ciudad": req.body.ciudad,
        "ubicacion": req.body.ubicacion,
        "valoracion": req.body.valoracion,
        "telefono": req.body.telefono,
        "email": req.body.email
    }
    try {
        await Camping.create(dataCamping)
        res.json({status: "Ingresado correctamente"})
        var tamano;
        for (let index = 1; index <= req.body.pequena+req.body.mediana+req.body.grande; index++) {
            if (index <= req.body.pequena){
                tamano = "Pequeña";
            }else if (index <= req.body.pequena+req.body.mediana){
                tamano = "Mediana";
            }else{
                tamano = "Grande";
            }
            var dataparcela = {
                    "id_camping": req.body._id,
                    "num_parcela": index,
                    "tamaño" : tamano
            }
            
            await Parcela.create(dataparcela)
            
    }
    }catch(err) {
        console.log(err)
        res.json({status: "No se ha ingresado correctamente el camping"})
    }
    
};


module.exports = {
    registrarCamping
};