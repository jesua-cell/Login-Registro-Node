const express = require("express")
const  link  = require("../config/link.js")
const router = express.Router()

//Inicio de la Ejecucion del archivo "index.ejs"
router.get("/", function(req,res){
    res.render("index",{link})
})

module.exports = router