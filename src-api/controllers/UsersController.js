const { compare } = require('bcryptjs');
const Usuario = require('./../models/Usuario');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const registrarUsuario = async function (req, res) {
  try {
    const data = req.body
    const consultaAux = await Usuario.findOne({"dni": data.dni},{contrasena:0}).exec();
    if(consultaAux){
      await Usuario.create(data)
      const token = jwt.sign({ id: data._id, role: data.role }, process.env.JWT_SECRET,{
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
    console.log()
    res.json({status: "No se ha ingresado correctamente"})
  }
};



const loginUsuario = async function (req, res) {
  try {
    const {email , contrasena} = req.body;
    const user = await Usuario.findOne({email: email});
    
    if(!user || user.role == "administrador"){
      res.status(404)
      res.send({error: "No se ha encontrado ningun usuario"})
      return
    }
    const checkContrasena = await bcrypt.compare(contrasena, user.contrasena)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
      expiresIn: '1d'});
    if(checkContrasena){
      user.contrasena = null;
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
    
    res.json({status: "Error en el login"})
  }
};
const loginUsuarioAdministrador = async function (req, res) {
  try {
    const {email , contrasena} = req.body;
    const user = await Usuario.findOne({email: email});
    
    if(!user || user.role == "usuario_registrado"){
      res.status(404)
      res.send({error: "No se ha encontrado ningun usuario"})
      return
    }
    const checkContrasena = await bcrypt.compare(contrasena, user.contrasena)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{
      expiresIn: '1d'});
    if(checkContrasena){
      user.contrasena = null;
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
    
    res.json({status: "Error en el login"})
  }
};

const mostrarDatosUsuario = async function (req, res) {
  var id = req.params.id;
  try{
    consulta = await Usuario.findOne({_id:id},{contrasena:0}).exec()
    console.log(consulta)
  }catch(err){
    
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

const mostrarUsuarios = async function (req, res) {
  let stringQuery = req.query;
  try{
    consulta = await Usuario.findOne().exec()
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


const updateUser = async function (req, res) {
  try{
    consulta = await Usuario.findByIdAndUpdate(req.params.id, req.body).exec()
    console.log("prueba consulta")
    console.log(consulta)
    res.status(200);
    res.json(
      'Cambios confirmados'
    );
  }catch(err){
    console.log(err)
    res.json({status:"error",error:"Error"})
  }
  
}
const updatePassword = async function (req, res) {
  try{
    const {contrasenaActual , contrasenaNueva} = req.body;
    console.log(contrasenaActual)
    const user = await Usuario.findOne({_id: req.params.id});
    const checkContrasena = await bcrypt.compare(contrasenaActual, user.contrasena)
    if (checkContrasena){
      // aplica una función hash al password usando la nueva salt
      bcrypt.hash(contrasenaNueva,SALT_WORK_FACTOR, async function (err, hash) {    
        console.log(err)  
        console.log("Este es el hash "+hash)  
      consulta = await Usuario.findByIdAndUpdate(req.params.id, {contrasena : hash}).exec()
      res.status(200);
      res.json(
        'Cambios confirmados'
      );
    });
    
    }else{
      res.json(
        ' Las contraseñas no coinciden'
      );
    }
  }catch(err){
    console.log(err)
    res.json({status:"error",error:"Error"})
  }
  
}

module.exports = {
    registrarUsuario,
    mostrarUsuarios,
    loginUsuario,
    loginUsuarioAdministrador,
    mostrarDatosUsuario,
    updateUser,
    updatePassword
}