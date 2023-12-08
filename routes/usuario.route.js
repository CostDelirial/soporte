/*
    RUTA: /api/usuario
*/

const { Router } = require('express');
const { getUsuarios, postUsuario } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.get('/', getUsuarios)

router.post('/',validarJWT, postUsuario)


module.exports = router;