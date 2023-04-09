const { compare } = require('bcryptjs');
const Usuario = require('./../models/Usuario');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const registrarUsuario = async function (req, res) {
  try {
    const data = req.body
    const consultaAux = await Usuario.find({"dni": data.dni}).exec();
    if(consultaAux.length ===  0){
      await Usuario.create(data)
      const token = jwt.sign({ id: consultaAux[0]._id }, process.env.JWT_SECRET,{
      expiresIn: '1d'});
      res.status(201).json({
        status: 'success',
        token,
        data: {
          data,
        },
      });
    }else{
      res.json({status: "Usuario ya esta registrado"})
    }
      
  }catch(err) {
    console.log(err)
    res.json({status: "No se ha ingresado correctamente"})
  }
};



const loginUsuario = async function (req, res) {
  try {
    const {email , contrasena} = req.body;
    const user = await Usuario.findOne({email: email});
    if(!user){
      res.status(404)
      res.send({error: "No se ha encontrado ningun usuario"})
      return
    }

    const checkContrasena = await bcrypt.compare(contrasena, user.contrasena)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
      expiresIn: '1d'});
    if(checkContrasena){
      res.send({
        data: user,
        token: token,
      })
      return
    }
    if(!checkContrasena){
      res.status(409);
      res.send({error: "Contraseña invalida"});
      return
    }
  }catch(err) {
    console.log(err)
    res.json({status: "Error en el login"})
  }
};


const mostrarUsuarios = async function (req, res) {
  let stringQuery = req.query;
  try{
    consulta = await Usuario.find().exec()
  }catch(err){
    console.log(err)
    res.json({status:"error",error:"Error"})
  }

  jwt.verify(req.token, process.env.JWT_SECRET , function(error, authData) {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({
      consulta
    });
  }
});
}


module.exports = {
    registrarUsuario,
    mostrarUsuarios,
    loginUsuario
};