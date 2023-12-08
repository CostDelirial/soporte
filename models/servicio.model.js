const { Schema, model } = require('mongoose');

const ServicioSchema = Schema({
    tipo: { type: String, default: 'Soporte', required: true},
    tipoSoporte: { type: Array, default: 'Soporte', required: true},
    observaciones: { type: String, default: 'SIN DATO'},
    fechaSolicitud: { type: String, required: true},
    fecha: { type: String, default: new Date()},
    ///////////////////////////////////////////ALTA O BAJA ///////////////////////
    nombreAltaBaja:{ type: Array, default: 'SIN DATO'},
    /////////////////////////////////RESPONSABLE CARPETA /////////////////////////
    nombreResponsable:{ type: String, default: 'SIN DATO'},
    nombreCarpeta:{ type: String, default: 'SIN DATO'},
    comparteCon: { type: Array, default: 'SIN DATOS'},
    nombreHost:{ type: String, default: 'SIN DATO'},
    seriePC:{ type: String, default: 'SIN DATO'},
    //////////////////////////////// SE SUBE ARCHIVO /////////////////////////////
    documento: { type: String, default:'SIN DOCUMENTO' },
    ficha:{ type: Schema.Types.ObjectId, ref: 'Usuario',autopopulate: true},

});

//populate automatico para relaciones
ServicioSchema.plugin(require('mongoose-autopopulate'));

module.exports = model('Servicio', ServicioSchema);