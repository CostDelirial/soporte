const TipoServicio = require('../models/tipoServicio.model');
const { response } = require('express')




const getTipoServicio = async ( req, res) => {
    const tipoServicio = await TipoServicio.find({},'tipo');

    res.json({
        ok: true,
        tipoServicio
    })
}

const postTipoServicio = async ( req, res = response ) => {
    const {tipo} = req.body;
    try{
        const existeTipo = await TipoServicio.findOne({tipo})

        if(existeTipo){
            return res.status(400).json({ok: false, msg:'El tipo de servicio ya existe'})
        }

        const tipoSer = new TipoServicio(req.body)
        await tipoSer.save();

        res.json({
            ok: true,
            tipoSer,
            msg:'guardado con exito'
        })


    }catch(error){
        console.log(error);
        res.status(500).json({ok: false, msg: 'Error inesperado'})
    }   
}

module.exports = {
    getTipoServicio,
    postTipoServicio
}





