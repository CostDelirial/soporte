const Servicio = require('../models/servicio.model');
const Usuario = require('../models/usuario.model')
const { response } = require('express');
const { arreglo } = require('../helpers/documento');
const path = require('path');



const getServicios = async  ( req, res) => {
    const tipo = req.params.tipo
    const servicio = await Servicio.find({tipo: tipo});
   /* const servicio = await Servicio.find({},'tipo observaciones')
    .populate({path:'tipo'});*/

    res.json({
        ok: true,
        servicio
    })
}
//////////////////////////// andpoints para graficas  
/////////////// ver las diferentes tipos de servicio registrados dentro del sistema (titulo de la grafica de barra)
const getTipos = async ( req, res = response ) => {
    console.log('contar')
    
    const numero = await Servicio.aggregate([ {$group: { _id: "$tipo", count:{$sum: 1}}}])
    
    res.json({
        ok: true,
        data: numero
    })
}
/////////////////////////////////////////////////////////////fin end ppoints graficas
///////////////////////////////////////////////////////////////////
//                          POST SERVCIO NUEVO
//////////////////////////////////////////////////////////////////
const postServicio = async( req, res = response ) => {
    try{
        const body = req.body
        const file = req.files 
        
        //////funcion para generar el arreglo dentro del body
        const tipo = await Servicio.findOne({ficha: body.ficha, tipo: 'Baja'})
         if(body.tipo === 'Baja'){
         if(tipo){
            return res.status(301).json({
                ok: false,
                msg: 'El usuario ya cunea con una baja'
            })
         }
        }
        ///////////////////////////////////////////////////
        const todo = new Servicio(body)
        /////////////////////////Validar que en el req exista un documento 
        if(!file || Object.keys(file).length === 0 ){
            return res.status(400).json({
                ok: false,
                msg: 'No se agrego un archivo al formulario'
            })
        }
        ////////////////////////////////////////////////////////////////////

        ////////////////////////////////////extraer nombre y extension de documento y modificarlo
        const documento = file.documento
        const nombreCortado = documento.name.split('.')
        const extensionArchivo = nombreCortado[nombreCortado.length -1 ]

        ////////////////////////////////validar extenison de archivo
        const valida = ['pdf','jpeg','jpg']
        
        for(var i = 0; valida.length < i; i++){
            console.log(valida[i])
            if(!valida[i].includes(extensionArchivo)){
                return res.status(400).json({
                    ok: false,
                    msg: 'No es un tipo de archivo valido'
                })
            }
        }
        ////////////////////////////////////////////////////////////////////
       

        ///////////////////////////////////////////generar nombre para guardar file
        const anio = new Date().getFullYear()
        const dia = new Date().getDay()
        const tiempo = new Date().getTime()
        const nombreArchivo = `${body.ficha}-${anio}-${dia}-${tiempo}.${extensionArchivo}`
        todo.documento = nombreArchivo
        ////////////////////////////////////////////////////////////////////
        ////////////////////direccion del archivo y guardado del mismo 
        const path = `./uploads/${body.tipo}/${nombreArchivo}`
        /////////////////////////////////////////////////////////////////////

        ////////////////////Guardar Documento en path y guardar body
        documento.mv(path, (err) => {
            if(err){
                return res.status(500).json({
                    ok: false,
                    msg: 'Erro al mover el documento'
                })
            }

            todo.save()
            res.json({ok: true, todo, msg: 'Exitoso'})

        })
        /////////////////////////////////////////////////////////////////////
    }catch(error){
        console.log(error)
    }
}




///////////////////////////////////////////////////////////////////
//                          GET PARA VER EL PDF
//////////////////////////////////////////////////////////////////
const verPDF = (req, res) => {
    const pdf = req.params.pdf;
    const tipo = req.params.tipo;

    const pathPdf = path.join(__dirname, `../uploads/${tipo}/${pdf}`);
    console.log(pathPdf)
    res.sendFile(pathPdf)
}



module.exports = {
    getServicios,
    getTipos,
    postServicio,
    verPDF
}









