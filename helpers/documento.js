const Servicio = require('../models/servicio.model');
const UsuarioApp = require('../models/usuarioApp.model')



const arreglo = async (body) => {
    console.log(body.tipo)
     switch (body.tipo){
        case "Soporte":
                return body.tipoSoporte = body.tipoSoporte.split(',')
            break;
        case "Carpetas compartidas":
                return body.comparteCon = body.comparteCon.split(',')
            break;
        case "Alta":
                return body.nombreAltaBaja = body.nombreAltaBaja.split(',')
            break;
        case "Baja":
                return body.nombreAltaBaja = body.nombreAltaBaja.split(',')
        break;
        default:
            break;
     }
}



module.exports = {
    arreglo
}