const UsuarioApp = require('../models/usuarioApp.model');
const { response } = require('express');
const crypt = require('bcryptjs');
const  { generarJWT } = require('../helpers/jwt');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              consulta d etodos los usuarios
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUsuarios = async (req, res) => {

    const usuarioApp = await UsuarioApp.find({}, 'nombre ficha status role');

    res.json({
        ok: true,
        usuarioApp,
        uid: req.uid
    })
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                              crear usuario
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const crearUsuarioApp = async (req, res = response) => {

    const { ficha, password } = req.body;
console.log(req.body)
try {
    const existeFicha = await UsuarioApp.findOne({ ficha });

    //validar que el control o ficha  no se repita
    if (existeFicha) {
        return res.status(400).json({ ok: false, msg: 'El número de control ya existe en BD' });
    }

    const usuarioApp = new UsuarioApp(req.body);
        console.log(usuarioApp);
    //encriptar contraseña
    const salt = crypt.genSaltSync();
    usuarioApp.password = crypt.hashSync(password, salt);

    //guardar usuario
    await usuarioApp.save();

    //generar token JWT
    const token = await generarJWT(usuarioApp.id,usuarioApp.nombre,usuarioApp.ficha, usuarioApp.status );
   /*const io = socketIO.Server 
    io.emit('user-nuevo');*/

    res.json({
        ok: true,
        usuarioApp,
        token
    });

} catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Error inesperado' });
}

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//     datos de usuario logeado
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const getUserLogeado = async ( req, res = response ) => {
    console.log(req.uid)
    const id = req.uid
    const user = await UsuarioApp.findById({ _id: id })
    
    res.json({ 
        ok: true,
        user,
        //menu: getMenuFrontEnd(user.role)
    }) 
}


module.exports = {
    getUsuarios,
    crearUsuarioApp,
    getUserLogeado
}