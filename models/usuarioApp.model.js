const { Schema, model } = require('mongoose');

const UsuarioAppSchema = Schema({

    ficha: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER' },
    fechaInicio: { type: Date,default: new Date},
    status: { type: String, required: true, default: 'DESACTIVADO' },

});

UsuarioAppSchema.method('toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id; //sustituir _id por uid

    return object;

});

module.exports = model('UsuarioApp', UsuarioAppSchema);