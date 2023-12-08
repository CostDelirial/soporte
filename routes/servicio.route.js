const { Router } = require('express');
const { getServicios, getTipos, postServicio, verPDF } = require('../controllers/servicio.controller')
const expressFileupload = require('express-fileupload');
const { validarJWT } = require('../middleware/validar-jwt');




const router = Router();

router.use( expressFileupload());

router.get('/:tipo', getServicios)

router.get('/tipos/servicios',validarJWT, getTipos )

router.post('/', validarJWT,postServicio)

router.get('/:tipo/:pdf',verPDF)


module.exports = router;