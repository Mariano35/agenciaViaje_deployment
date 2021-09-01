import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

const app = express();

//conectar con la base de datos
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch( error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;
 
//Habilitar Pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use( (request, response, next) => {
   const year = new Date();   
   response.locals.actualYear = year.getFullYear();
   response.locals.nombreSitio = "Agencia de Viajes";
   next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

//Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
    console.log('El Servidor esta funcionando');
});