//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const Redis = require('ioredis');
const { RedisStore } = require('connect-redis');
const { REDIS_URL } = require('./config/variableEntorno.js')

const app = express();

//Cliente de Redis

const redisClient = new Redis(REDIS_URL)

//Almcanemiento de sesiones de redis con connect-redis:

const redisStore = new RedisStore({ client: redisClient });

//Manejo de sision, express-sesion para usarlo con redis:

app.use(session({
    store: redisStore,
    secret: 'contra',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

//Manerjo de errores:
redisClient.on('error', (err) => {
    console.error('Error de redis: ', err)
})

//Puerto

const { PORT } = require('./config/variableEntorno.js')

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

