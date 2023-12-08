const { Schema, model } = require('mongoose');

const TipoServicio = Schema({
    tipo: { type: String, required: true}
});

module.exports = model('TipoServicio', TipoServicio)