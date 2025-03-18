//IMPORTAR LIBRERIAS
const express = require('express')
const app = express()
const session = require('express-session')

//Puerto

const { PORT } = require('./config/variableEntorno.js')

//configuraciones
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//MANEJO DE SESION
app.use(session({
    secret: "contra",
    resave: false,
    saveUninitialized: false
}))

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

