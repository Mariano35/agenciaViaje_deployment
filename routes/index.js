import express, { request, response } from 'express';
import { 
    paginaInicio, 
    paginaNosotros, 
    paginaViaje, 
    paginaTestimoniales, 
    paginaDetalleViaje,
} from '../controllers/paginasControllers.js';

import{
    guardarTestimoniales
} from '../controllers/testimonialControllers.js';

const router = express.Router();


router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViaje);

router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimoniales);


export default router;