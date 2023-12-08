/*
            RUTA: /api/auth

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.post('/',
[
 check('ficha', 'El control es oligatorio').not().isEmpty(),
 check('password','El Password es obligatorio').not().isEmpty(),
//validarCampos
],
login
)


//login de usuario 
// renovar token
router.get( '/renew',
    validarJWT,
    renewToken
)


module.exports = router;