const Parcela = require('../models/Parcela');



const mostrarParcela = async function (req, res) {
    let id = req.params.id;
    try {
        consulta = await Parcela.find({ id_camping: id }).exec()
        res.status(200).json({
            consulta
        });
    } catch (err) {
        res.status(404).json({ status: "error", error: "Error" })
    }

};


module.exports = {
    mostrarParcela
};