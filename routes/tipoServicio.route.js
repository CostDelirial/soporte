/*
        RUTA: /api/tipos
*/

const { Router } = require('express');
const { getTipoServicio, postTipoServicio } = require('../controllers/tipoServicio.controller');

const router = Router();

router.get('/',getTipoServicio)

router.post('/',postTipoServicio)


module.exports = router;