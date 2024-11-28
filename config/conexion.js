let conectar = require('mysql')
let conexion = conectar.createConnection({
    host:"localhost",
    database:"login",
    user:"root",
    password:""
})

conexion.connect(function(error){
    if (error) {
        throw error
    } else {
        console.log("--- CONECTADO ---");
    }
})

module.exports = conexion