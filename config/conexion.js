// let conectar = require('mysql')
const { createPool } = require('mysql2')

//Variables de Entorno:
const {
        DB_HOST,
        DB_PORT,
        DB_PASSWORD, 
        DB_USER,  
        DB_NAME 
    } = require('./variableEntorno.js')

//Prpiedades de la conexion a la BD:
//Tener Multiples conexiones:
const conexion = createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT
})

//Funcion de respuesta al hacer la conexion:
conexion.getConnection(function (error) {
    if (error) {
        throw error
    } else {
        console.log("--- CONECTADO ---");
    }
})

module.exports = conexion
