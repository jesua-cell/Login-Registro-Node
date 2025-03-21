//IMPORTAR LIBRERIAS
const express = require('express');
const session = require('express-session');
const Redis = require('ioredis');
const { RedisStore } = require('connect-redis');
const { REDIS_URL, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, MYSQL_URL, DB_NAME } = require('./config/variableEntorno.js')
const mysql = require("mysql2/promise")

const app = express();

//Configuracion de la BD de Mysql:

async function connectMySQL() {
    try {
        const connection = await mysql.createConnection(MYSQL_URL)
        console.log("Conectado a MySql", DB_HOST);
        return connection
    } catch (error) {
        console.error("Error en la conexion de MySql", error)
    }
}

connectMySQL()

//Crear la BD automaticamente:
async function createDataBase() {
    const tempConnection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT
    })

    if (process.env.NODE_ENV !== "production") {
        await tempConnection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`)
        console.log(`Base de Datos ${DB_NAME} creada`);
    }

    await tempConnection.query(`USE ${DB_NAME}`)

    await tempConnection.query(
        `CREATE TABLE IF NOT EXISTS usuarios (
                ide_usu VARCHAR(50) NOT NULL PRIMARY KEY,
                nom_usu VARCHAR(50) NOT NULL,
                ape_usu VARCHAR(50) NOT NULL,
                sex_usu CHAR(1) NOT NULL,
                fec_nac_usu DATE NOT NULL,
                tel_usu VARCHAR(15) NOT NULL,
                dir_usu VARCHAR(100) NOT NULL,
                cod_barrios1 VARCHAR(50) NOT NULL,
                mail_usu VARCHAR(100) NOT NULL,
                pass_usu VARCHAR(255) NOT NULL
            )`
    )

    console.log(`BD ${DB_NAME} creada`);
    await tempConnection.end()
}

createDataBase().then(connectMySQL)

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
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24,
    }
}))

// Conexxion en Redis:
redisClient.on("connect", () => {
    console.log("Conectado a Redis en: ", REDIS_URL);
})

//Manerjo de errores:
redisClient.on('error', (err) => {
    console.error('Error de redis: ', err)
})

//Puerto

const { PORT } = require('./config/variableEntorno.js');
const { enableCompileCache } = require('module');
const { use } = require('./rutas/index');

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

