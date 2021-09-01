import { request, response } from 'express';
import { Testimonial } from '../models/Testimoniales.js';
import { Viaje } from '../models/Viaje.js';

const paginaInicio = async (request, response) => { //request lo que enviamos : response lo que express nos responde
    
    //Consultar 3 viajes del modelo Viaje

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({limit: 3}));
    promiseDB.push(Testimonial.findAll({limit: 3}));
    

    try {
        const resultado = await Promise.all(promiseDB);

        response.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0], 
            testimoniales: resultado[1]
        });

    } catch (error) {
        console.log(error);
    }
    
}

const paginaNosotros = (request, response) => { //request lo que enviamos : response lo que express nos responde
    response.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViaje = async (request, response) => { 

    //consultar BD
    const viajes = await Viaje.findAll();

    console.log(viajes);

    response.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimoniales = async (request, response) => { 

    try {
        const testimoniales = await Testimonial.findAll();
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
    
}

//Muestra un viaje por su Slug
const paginaDetalleViaje = async (request, response) => {
    
    const { slug } = request.params;

    try {
        const viaje = await Viaje.findOne({ where : { slug }});

        response.render('viajeSlug', {
            pagina: 'Información Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViaje,
    paginaTestimoniales,
    paginaDetalleViaje
}
