const express = require("express") // Importamos ExpressJS
const cors = require("cors") // Control de acceso

const app = express() // Creamos una variable, una instancia del servidor que vamos a utilizar con express

app.use(cors()) // Indicamos que lo vamos a utilizar
app.use(express.json()) // Para poder recibir los datos que nos van a mandar los usuarios por medio de POST en formato JSON necesitamos activar este modo en la app.

const jugadores = [] // Variable donde vamos a almacenar los jugadores que se vayan uniendo

// Creamos la clase del jugador
class Jugador {
    constructor(id) {
        this.id = id
    } 

    // Creamos la fn para poder asignar a cada jugaro el mokepon que seleccionó
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }

    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
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

    const jugador = new Jugador(id) // Creamos el nuevo jugador con el id que creamos aleatoriamente
    jugadores.push(jugador) // Empujamos los datos al array

    res.setHeader("Access-Control-Allow-Origin", "*") // Permitimos el acceso desde cualquier lugar

    res.send(id) // Enviamos como respuesta el ID del jugador unido (Frontend)
    console.log(id);
})

// Peticion tipo post
// Nombre de servicio (variable tipo parametro, viene en la url)
app.post("/mokepon/:jugadorId", (req, res) => {
    // Extraemos el ID de la peticion, que viene de la URL y la almacenamos en una variable
    const jugadorId = req.params.jugadorId
    // Almacenamos el nombre del mokepon que elijio ese jugador (la variable mokepon viene del frontend, del cuerpo de la peticion (linea 515))
    const nombre = req.body.mokepon.nombre || "" 
    // Creamos el objeto tipo mokepon pasandole ese nombre
    const mokepon = new Mokepon(nombre)
    // Buscamos dentro del arreglo de jugadores, el jugador con ese ID para almacenar el nombre del mokepon que seleccionó
    // Buscamos en toda la lista que compla con dicha condición. Si existe en la lista nos devuelve su num de lista sino nos devuelve -1
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    // Validamos que exista el id del jugador
    if (jugadorIndex >= 0) {
        // Asignamos el mokepon a ese jugador llamando a la fn dentro de la Clase que creamos para los jugadores
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    res.end() // Terminamos la peticion sin responder nada
})

// Por ahora estas direcciones las estamos inventando (endpoint)
// Endpoint donde vamos a recibir las coordenadas del mokepon del jugador
app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    // Almacenamos el ID del jugador que viene en la URL desde el Frontend
    const jugadorId = req.params.jugadorId
    // Tomamos los datos del cuerpo de la peticion
    // Estos provienen del Frontend
    const x = req.body.x || 0
    const y = req.body.y || 0
    // Comprobamos que el ID del jugador exista dentro de los almacenados
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        // Actualizamos la posicion en x, y del jugador llamando al metodo de la clase Jugador
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    // Almacenamos en una variable el resultado del filtrado de los demas jugadores que se unen al juego (Comparamos que los id que nos llegan de la peticion sean destintos al nuestro)
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    }) // Devolvemos JSON porque no acepta otro dato para enviar
})

// Definimos en que puerto va a estar escuchando esas peticiones
app.listen(8080, () => {
    console.log('Servidor escuchando..')
})