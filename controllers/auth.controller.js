const { response } = require('express');
const crypt = require('bcryptjs');
const UsuarioApp = require('../models/usuarioApp.model');
const { generarJWT } = require('../helpers/jwt');

//const {getMenuFrontEnd} = require('../helpers/menu-frontend');


const login = async (req, res = response) => {
    const { ficha, password } = req.body;
    console.log(req.body)
    try {
        //verificar control
        const usuarioDBApp = await UsuarioApp.findOne({ ficha });
      

        if (!usuarioDBApp) {
            return res.status(404).json({ ok: false, msg: 'El usuario no existe' })
        }

        // verificar contraseña
        const validPassword = crypt.compareSync(password, usuarioDBApp.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: 'La contraseña es incorrecta' })
        }

        //verificar que este activo el usuario
        if( usuarioDBApp.status === 'DESACTIVADO'){
            return res.status(302).json({ ok: false, msg: 'Comunicate con el Admin no estas activo en sistema'});
        }

        //generar token JWT
        const token = await generarJWT(usuarioDBApp.id,usuarioDBApp.nombre,usuarioDBApp.ficha, usuarioDBApp.status,usuarioDBApp.role );

        console.log(token)

        return res.json({
            ok: true,
            token,
            //menu: getMenuFrontEnd(usuarioDBApp.role),
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, msg: 'Comunicate con el Administrador' });
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////
//              renovar token
////////////////////////////////////////////////////////////////////////////////////////////////

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    //]Obtener usuario por UID
const usuarioApp = await UsuarioApp.findById( uid );


    res.json({
        ok: true,
        token,
        usuarioApp
    });

}

module.exports = {
    login,
    renewToken,
}