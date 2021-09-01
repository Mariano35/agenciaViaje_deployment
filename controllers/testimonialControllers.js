import { request, response } from "express";
import { Testimonial } from "../models/Testimoniales.js";

const guardarTestimoniales = async (request, response) => {

    //Validar
    const {nombre, correo, mensaje} = request.body;

    const errores = [];

    if (nombre.trim() === '') {
        errores.push({mensaje: 'El Nombre está vacio'});
    }

    if (correo.trim() === '') {
        errores.push({mensaje: 'El Correo está vacio'});
    }

    if (mensaje.trim() === '') {
        errores.push({mensaje: 'El Mensaje está vacio'});
    }

    if(errores.length > 0){

        //Consultar los testimoniales
        const testimoniales = await Testimonial.findAll();

        //Mostrar la vista con errores
        response.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else {
        //Almacenarlo en la base de Datos

        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            response.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export{
    guardarTestimoniales
}