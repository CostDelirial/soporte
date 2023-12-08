const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    ficha: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    nivel: { type: Number, required: true },
    vigencia: { type: String, require: true },
    situacion: { type: String, require: true },
    area: { type: String, required: true }

});

UsuarioSchema.method('toJSON', function () {

    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id; //sustituir _id por uid

    return object;

});

module.exports = model('Usuario', UsuarioSchema);