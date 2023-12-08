const Usuario = require('../models/usuario.model');
const { response } = require('express');

const getUsuarios = async ( req, res) => {
    const usuario = await Usuario.find({});

    res.json({
        ok: true,
        usuario,
        
    })
}

const postUsuario = async ( req, res = response) => {
    const { ficha } = req.body;
    try{
        const existeFicha = await Usuario.findOne({ ficha });
        if( existeFicha ){
            return res.status(400).json({ok: false, msg: 'El usuario ya existe con esa ficha'})
        }
        const usuario = new Usuario(req.body);

        await usuario.save();

        res.json({
            ok: true,
            usuario,
            mensaje: 'Usuario registrado'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({ok: false, msg: ' Error inesperado'})
    }
}
module.exports = {
    getUsuarios,
    postUsuario
}