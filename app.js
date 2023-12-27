require('dotenv').config({ encoding: 'latin1' });
const express = require('express');
const { auth } = require("express-oauth2-jwt-bearer");
const app = express()
app.use(express.json());
const librosRouter = require('./routes/libros');

const  autenticacion = auth({
    audience: "http://apiexample.com/api/libros",
    issuerBaseURL: "https://dev-6kheafszlnh3mean.us.auth0.com/", 
    tokenSigningAlg: "RS256",
    });

//Configuramos el middleware de autenticacion
app.use("/api/libros", autenticacion , librosRouter );

const errorHandler = require('./middleware/errorHandler');

app.use(errorHandler);

app.listen(process.env.PORT,() => {
    console.log(`puerto escuchando http://localhost:${process.env.PORT}/`);
})
