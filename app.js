//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const Redis = require('ioredis');
const { RedisStore } = require('connect-redis');
const { REDIS_URL } = require('./config/variableEntorno.js')

const app = express();

//Configuracion del cliente de Redis:

const redisOption = process.env.NODE_ENV === "production" 
  ? { 
      tls: { 
        rejectUnauthorized: false 
      } 
    } 
  : {};

//Cliente de Redis

const redisClient = new Redis(REDIS_URL, redisOption);

console.log(REDIS_URL);

//Almcanemiento de sesiones de redis con connect-redis:

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
    disableTouch: true
});

//Manejo de sision, express-sesion para usarlo con redis:

app.use(session({
    store: redisStore,
    secret: 'contra',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

// Conexxion en Redis:
redisClient.on("connect", () => {
    console.log("Conectado a Redis en: ",REDIS_URL);
})

//Manerjo de errores:
redisClient.on('error', (err) => {
    console.error('Error de redis: ', err)
})

//Puerto

const { PORT } = require('./config/variableEntorno.js');
const { enableCompileCache } = require('module');

//configuraciones
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//MANEJO DE SESION
// app.use(session({
//     secret: "contra",
//     resave: false,
//     saveUninitialized: false
// }))

//RUTAS Dinamicos y Estaticas
app.use(require("./rutas/index"))
app.use(express.static("public"))
app.use(require("./rutas/regUsuario"))
app.use(require("./rutas/codLogin"))
app.use(require("./rutas/inicio"))

//Configuracion del PUERTO del SERVIDOR

app.listen(PORT, function () {
    if (PORT == 3000) {
        console.log("http://localhost:3000");
    } else {
        console.log(PORT);
    }
})

