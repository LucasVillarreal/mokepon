const express = require("express") // Importamos ExpressJS
const cors = require("cors")

const app = express() // Creamos una app con express

app.use(cors()) 
app.use(express.json())

const jugadores = [] // Variable donde vamos a almacenar los jugadores que se vayan uniendo

// Creamos la clase del jugador
class Jugador {
    constructor(id) {
        this.id = id
    } 

    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
} 

// Le decimos a express que cuando en la url que definimos reciba una peticion responda con determinada respuesta
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}` // Creamos un num aleatorio y lo convertimos en texto (template string)

    const jugador = new Jugador(id) // Creamos el nuevo jugador con el id que creamos
    jugadores.push(jugador) // Empujamos los datos al array

    res.setHeader("Access-Control-Allow-Origin", "*") // Permitimos el acceso desde cualquier lugar

    res.send(id)
})

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId
    const nombre = req.body.mokepon.nombre || "" 
    const mokepon = new Mokepon(nombre)
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    res.end()
})

// Definimos en que puerto va a estar escuchando esas peticiones
app.listen(8080, () => {
    console.log('Servidor escuchando..')
})