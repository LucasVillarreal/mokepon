const express = require("express") // Importamos ExpressJS

const app = express() // Creamos una app con express

// Le decimos a express que cuando en la url que definimos reciba una peticion responda con determinada respuesta
app.get("/", (req, res) => {
    res.send("Hola")
})

// Definimos en que puerto va a estar escuchando esas peticiones
app.listen(8080, () => {
    console.log('Servidor escuchando..')
})