const express = require('express')
const router = express.Router()
const link = require('../config/link')
const conexion = require('../config/conexion')
const bcrypt = require('bcryptjs')

//DISEÑO DE LA RUTA
router.post("/codLogin", function(req, res){
    const mai = req.body.email
    const pass = req.body.password

    //Validar si el CORREO existe
    const validar = "SELECT * FROM usuarios WHERE mail_usu = ?"
    conexion.query(validar, [mai], async function(error, rows){
        let mensaje
        if (error) {
            console.log("Error en la validacion del Correo", error);
            return res.status(500).send("Error en la servidor de la Validacion")
        }
        if (rows.length < 1){
            mensaje = "El CORREO ingresado no existe"
            res.render("index",{mensaje, link})
        }else{
            //Validar la contraseña
            const user = rows[0]
            const match = await bcrypt.compare(pass, user.pass_usu)
            
            if(!match){
                mensaje = "Contraseña Incorrecta"
                res.render("index", {mensaje, link})    
            }else{
                req.session.login = true
                req.session.codusu = user.cod_usu
                req.session.ideusu = user.ide_usu
                req.session.apeusu = user.ape_usu
                req.session.nomusu = user.nom_usu
                req.session.sexusu = user.sex_usu
                req.session.telusu = user.tel_usu
                req.session.dirusu = user.dir_usu
                req.session.codbar = user.cod_barrios1
                req.session.mailusu = user.mail_usu
                console.log(req.session); 
                res.render("inicio",{datos:req.session, link})
            }
        }
    })
})

module.exports = router