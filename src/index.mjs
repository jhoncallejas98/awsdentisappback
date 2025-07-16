// Paso 1: Importar la dependencia de Express
//const express = require('express'); // CommonJS
import express from 'express';  //ESModule

// import product from './routes/product.route.mjs'
import disponibilidad from './routes/disponibilidad.router.mjs'
import dbConnect from './config/mongo.config.mjs'; // importamos la conexion a la base de datos. 
import appoiment from  './routes/appoiment.route.mjs'
import Users from './routes/users.route.mjs'
import auth from './routes/auth.router.mjs'; // importamos la ruta de autenticacion
import formulacionMedica from './routes/formulacion-medica.route.mjs'
import historiaClinica from './routes/historia-clinica.route.mjs'
import incapacidadMedica from './routes/incapacidad-medica.route.mjs'
import cors from 'cors'; // Importamos cors para permitir peticiones desde el frontend
import todayRouter from './routes/todayPatients.route.mjs';
// Paso 2: Ejecutar express
const app = express();
const PORT = process.env.PORT || 3000;
// app.use(product); // implementar la ruta como un Middleware de express

app.use( express.json() );
app.use(cors({
  origin: ['https://dentisapp.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})); // Usamos cors para permitir peticiones solo desde el frontend real

// app.use(product); // implementar la ruta como un Middleware de express
app.use(appoiment); // implementa la ruta de appoiment. 
app.use(disponibilidad); // implementar ruta de disponibilidad.
app.use(Users) // implementamos usuarios 
app.use(auth); // implementamos autenticacion
app.use(formulacionMedica);
app.use(historiaClinica);
app.use(incapacidadMedica);


//invocar la cofiguracion de la conexion a la base de datos. 

app.use(todayRouter);//invocar la cofiguracion de la conexion a la base de datos. 

dbConnect();



// Paso 4: Lanzar el servidor web en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor lanzado exitosamente ;)   http://localhost:${PORT}`);
});