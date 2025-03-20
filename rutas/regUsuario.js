const express = require('express')
const router = express.Router()
const  link  = require("../config/link.js")
const conexion = require("../config/conexion")
const bcrypt = require('bcryptjs')
const saltRounds = 10

router.post("/regUsuario", async function(req, res){
    let cod = req.body.cod
    let ide = req.body.ide
    let nom = req.body.nombre
    let ape = req.body.ape
    let genero = req.body.genero
    let fecha = req.body.fecha
    let tel = req.body.tel
    let dire = req.body.dire
    let localidad = req.body.localidad
    let correo = req.body.correo
    let contraseña = req.body.contra

    try {
        const hashedPas = await bcrypt.hash(contraseña, saltRounds)

        const insertar = "INSERT INTO usuarios (ide_usu, nom_usu, ape_usu, sex_usu, fec_nac_usu, tel_usu, dir_usu, cod_barrios1, mail_usu, pass_usu) VALUES (?,?,?,?,?,?,?,?,?,?);"

        conexion.query(insertar, [ide,nom,ape,genero,fecha,tel,dire,localidad,correo, hashedPas],function(err){
            if (err) {
                console.log("Error al intentar registrar el USUARIO", err);
                return res.status(500).send("Error al registrar Usuario", err)
            } else {
                console.log("Resigro Hecho");
                let mensaje = "Registro Hecho, Inicia Sesion"
                res.render("index",{mensaje,link})
            }
        })

    } catch (error) {   
        console.log("Error al Registrar", error);
        res.status(500).send("Error en el servidor")
    }
})

module.exports = router