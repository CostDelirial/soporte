/*
        RUTA: /api/registro
*/

const { Router } = require('express');
const { postServicio } = require('../controllers/servicio.controller')


const router = Router();


router.use('/', postServicio );


module.exports = router;