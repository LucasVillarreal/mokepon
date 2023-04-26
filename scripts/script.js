// VARIABLES GLOBALES
 // Declaramos las variables de ataque para almacenar más adelante los ataques de cada ronda
let ataqueJugador = [] 
let ataqueEnemigo = []
 // Variables donde almacenamos e inicializamos las vidas de las mascotas
let victoriasJugador = 0
let victoriasEnemgio = 0
 // Variable donde vamos a almacenar los OBJETOS
let mokepones = [] 
let mokeponesEnemigos = [] 
 // Variable donde luego vamos a almacenar el template que mostaremos en el HTML
let opcionDeMokepones
let opcionDeAtaques
let botonFuego
let botonAgua
let botonTierra
let botones = [] 
// Variables globales que luego almacenaremos la referencia de las mascotas
let hipodoge 
let capipepo
let raigueya
let indexAtaqueJugador
let indexAtaqueEnemigo
// Variable creada para poder utilizarla en el mapa y mostrar la imagen del mokepon seleccionado
let mokeponSeleccionado
// Variable que utilizaremos para darle movimiento continuo al mokepon
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let sectionBotonesAtaques = document.getElementById('section-ataque-buttons')
// Hacemos referencia a la seccion donde vamos a mostrar las tarjetas de las mascotas
const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
// Guardamos las referencias a los botones de los ataques del HTML
// Hacemos referencia al boton de seleccionar masctoa del HTML
const mascotaJugador = document.getElementById('boton-seleccionar-mascota')
// Referencia al boton de reiniciar la partida
const botonReinicio = document.getElementById('boton-reinicio')
// Lo inicializamos ocultado
botonReinicio.style.display = 'none'
// Referencia a la seccion global de los ataques
const sectionAtaques = document.getElementById('seleccionar-ataque')
// La ocultamos hasta que definamos con que mascota pelear
sectionAtaques.style.display = 'none'
// Referencia a la seccion global donde estan las mascotas a seleccionar
const sectionSeleccion = document.getElementById('seleccionar-mascota')
// Span donde van a aparecer los nombres del mokepon del jugador
const mascotaJugadorHTML = document.getElementById('nombreMascota')
// Span donde aparecerá el nombre
let mascotaJugadorEnemigo = document.getElementById('nombreMascotaEnemigo')
// Creamos y almacenamos los parrafos a mostrar en Html
// Con los mensajes a mostrar
let parrafoJugador = document.getElementById('ataqueJugador')
let parrafoEnemigo = document.getElementById('ataqueEnemigo')
const mostrarParrafos = document.getElementById('resultadoAtaques')
const parrafoFinal = document.getElementById('result-final')
const spanVidaMascota = document.getElementById('mascotaVida')
const spanVidaMascotaEnemigo = document.getElementById('mascotaVidaEnemigo')
// Le agregamos un evento que cuando haga click llame a la fn
mascotaJugador.addEventListener('click', seleccionarMascotaJugador)
const sectionVS = document.getElementById('sectionVS')
// Mapa
const sectionVerMapa = document.getElementById('verMapa')
sectionVerMapa.style.display = 'none'
const mapa = document.getElementById('mapa')
let lienzo = mapa.getContext('2d')
let alturaMapa
let anchoDelMapa = window.innerWidth - 80
alturaMapa = anchoDelMapa * 600 / 800
const anchoMaxMap = 850
if (anchoDelMapa > anchoMaxMap) {
    anchoDelMapa = anchoMaxMap
    alturaMapa = anchoMaxMap * 600 /800
}
mapa.width = anchoDelMapa
mapa.height = alturaMapa

let jugadorId = null

// CLASE donde vamos a crear la estructura para luego crear los objetos
// Este es el template que usaremos para luego construir nuestros objetos
// Todas las clases inician con la 1er letra en May
class Mokepon {
    // creamos las propiedades que va a llevar el objeto
    constructor(nombre, foto, vida, imgCabeza, x = 10, y = 10, id = null) {
        this.id = id
        // Hacemos referencia a esto mismo, a mi clase misma. Es una variable interna donde guardamos el valor
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = [] 
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = imgCabeza
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, 
            this.alto
        )
    }
}
// Creamos los objetos utilizando la clase MOKEPON, osea la estructura que creamos anteior
let hipodogeObjeto = new Mokepon('Hipodoge', './assets/hipodoge.png', 3, './assets/hipodogeMapa.png')
let capipepoObjeto = new Mokepon('Capipepo', './assets/capipepo.png', 3, './assets/capipepoMapa.png')
let ratigueyaObjeto = new Mokepon('Ratigueya', './assets/ratigueya.png', 3, './assets/ratigueyaMapa.png')

// let hipodogeObjetoEnemigo = new Mokepon('Hipodoge', './assets/hipodoge.png', 3, './assets/hipodogeMapa.png', 200, 404)
// let capipepoObjetoEnemigo = new Mokepon('Capipepo', './assets/capipepo.png', 3, './assets/capipepoMapa.png', 700, 250)
// let ratigueyaObjetoEnemigo = new Mokepon('Ratigueya', './assets/ratigueya.png', 3, './assets/ratigueyaMapa.png', 350, 100)


// Obejtos literarios
// Con el push indicamos que empuje estos datos al array en la variable de ataques que creamos en el constructor de la clase (template)
const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '💧', id: 'boton-ataque-agua'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🌱', id: 'boton-ataque-tierra'}
]
const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'boton-ataque-tierra'},
    {nombre: '🌱', id: 'boton-ataque-tierra'},
    {nombre: '🌱', id: 'boton-ataque-tierra'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '💧', id: 'boton-ataque-agua'}
]
const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '🔥', id: 'boton-ataque-fuego'},
    {nombre: '💧',  id: 'boton-ataque-agua'},
    {nombre: '🌱', id: 'boton-ataque-tierra'}
]
hipodogeObjeto.ataques.push(...HIPODOGE_ATAQUES)

capipepoObjeto.ataques.push(...CAPIPEPO_ATAQUES)

ratigueyaObjeto.ataques.push(...RATIGUEYA_ATAQUES)

// hipodogeObjetoEnemigo.ataques.push(...HIPODOGE_ATAQUES)

// capipepoObjetoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)

// ratigueyaObjetoEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

// Empujamos los objetos creados al array para luego poder iterarlo y mostar los datos en el HTML
mokepones.push(hipodogeObjeto, capipepoObjeto, ratigueyaObjeto)
// Templates literarios
// Recorremos el array de los objetos creados y mostramos en el HTML el template que creamos con los datos de cada objeto iterado
mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id="${mokepon.nombre}">
    <label for="${mokepon.nombre}">
        <img src="${mokepon.foto}" alt="Mascota ${mokepon.nombre}">
        <p>${mokepon.nombre}</p>
    </label>`
    contenedorTarjetas.innerHTML += opcionDeMokepones
    // Creamos las referencias a cada uno de los inputs creados para luego poder "escuchar" cuando hacemos click en alguno de ellos
    hipodoge = document.getElementById('Hipodoge')
    capipepo = document.getElementById('Capipepo')
    raigueya = document.getElementById('Ratigueya')
})

unirseAlJugo()
// Llamamos a la fn de elegir un num aleatorio pasandole el rango
let mascotaAleatoria = aleatorio(0, mokepones.length - 1)

function seleccionarMascotaJugador() {
    // Almacenamos todos los objetos creados (mokepones)
    const arrayMascotas = [hipodoge, capipepo, raigueya] 
    // Se ejecutaba sola, porque al tener la invocacion con los () se ejecuta en el instante
    botonReinicio.addEventListener('click', reiniciar)
    // El error era que haciamos un ciclo de más 
    // entonces no daba un undefine y no podiamos continuar
    // por eso la condicon solo tiene que ser <
    // Recorremos el array de todas las opciones y chequeamos cual está seleccionado
    for (i = 0; i < arrayMascotas.length; i++) {
        if (arrayMascotas[i].checked) {
            mokeponSeleccionado = mokepones[i]
            // Acá chequeamos cual está seleccionado y accedemos para mostrar el nombre
            mascotaJugadorHTML.innerHTML = `<img src="${mokepones[i].foto}" alt="Mascota ${mokepones[i].nombre}">`
            // Recorremos el array de los objetos pasandole el que seleccionamos previamente y accedemos a los ataques recorriendolos uno por uno para luego mostralos en en HTML
            mokepones[i].ataques.forEach((ataque) => {
                opcionDeAtaques = `<button class="BAtaque" id="${ataque.id}">${ataque.nombre}</button>`
                    sectionBotonesAtaques.innerHTML += opcionDeAtaques
                })
            // sectionAtaques.style.display = 'flex'
            sectionVerMapa.style.display = 'flex'            
        } 
    }
    // Los sacamos del principio del archivo ya que recien en este momento del código es donde van a crearse los botones y recien acá podemos acceder a ellos
    botonFuego = document.getElementById('boton-ataque-fuego')
    botonAgua = document.getElementById('boton-ataque-agua')
    botonTierra = document.getElementById('boton-ataque-tierra')
    botones = document.querySelectorAll('.BAtaque')
    // Llamamos a la fn que selecciona la mascota del enemigo de forma aleatoria
    // seleccionarMascotaEnemigo()
    sectionSeleccion.style.display = 'none'
    // Definimos cada cuanto tiempo en mms se va a actualizar el mapa
    seleccionarMokepon(mokeponSeleccionado)
    iniciarMapa()
}


// Fn donde implementamos la lógica para que se elija de forma automática la mascota del enemigo
function seleccionarMascotaEnemigo(enemigo) {
    // // Llamamos a la fn de elegir un num aleatorio pasandole el rango
    // let mascotaAleatoria = aleatorio(0, mokepones.length - 1)
    // Comparamos el resultado de la fn aleatorioa y vemos a que mascota pertenece para seleccionarla y mostrarla en el HTML
    mascotaJugadorEnemigo.innerHTML = `<img src="${enemigo.foto}" alt="Mascota ${enemigo.nombre}">`
    secuenciaAtaques(enemigo)
} 

function secuenciaAtaques(enemigo) {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.id == botonFuego.id) {
                ataqueJugador.push('FUEGO')
                boton.disabled = true
            } else if (e.target.id == botonAgua.id) {
                ataqueJugador.push('AGUA')
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                boton.disabled = true
            }
            // Llamamos a los ataques del enemigo pasandole el enemigo que colisionamos
            ataqueAleatorioEnemigo(enemigo)
        })
    })
} 

// Fn donde hacemos la logica del ataque del enemigo
// Implementando la logica de la fn de aleatoriedad
function ataqueAleatorioEnemigo(enemigo) {
    ataqueAleatorio = aleatorio(0, enemigo.ataques.length - 1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1 ) {
        ataqueEnemigo.push('FUEGO')
    }  else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('AGUA')
    } else {
        ataqueEnemigo.push('TIERRA')
    }
    // Llamamos a la fn donde imprimimos los resultados de los ataques en el HTML
    compararAtaques()
} 

function compararAtaques() {
    if (ataqueJugador.length === 5) {
        crearMensaje()
    }
}

function indexAmbosOponentes(jugador, enemigo) {
    if (ataqueJugador[jugador] == 'FUEGO') {
        indexAtaqueJugador = '🔥'
    } else if (ataqueJugador[jugador] == 'AGUA') {
        indexAtaqueJugador = '💧'
    } else {
        indexAtaqueJugador = '🌱'
    }

    if (ataqueEnemigo[enemigo] == 'FUEGO') {
        indexAtaqueEnemigo = '🔥'
    } else if (ataqueEnemigo[enemigo] == 'AGUA') {
        indexAtaqueEnemigo = '💧'
    } else {
        indexAtaqueEnemigo = '🌱'
    }
}

function crearMensaje() {
    for (i = 0; i < ataqueJugador.length; i++) {
        let pJ = document.createElement('p')
        let pE = document.createElement('p')
        if (ataqueJugador[i] == ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            mostrarParrafos.innerHTML = 'EMPATE 😵'
            pJ.innerHTML = indexAtaqueJugador
            pE.innerHTML = indexAtaqueEnemigo
            parrafoJugador.appendChild(pJ)
            parrafoEnemigo.appendChild(pE)
        } else if (ataqueJugador[i] == 'FUEGO' && ataqueEnemigo[i] == 'TIERRA' || ataqueJugador[i] == 'AGUA' && ataqueEnemigo[i] == 'FUEGO' || ataqueJugador[i] == 'TIERRA' && ataqueEnemigo[i] == 'AGUA') {
            mostrarParrafos.innerHTML = 'GANASTE 🎉'
            victoriasJugador++
            spanVidaMascota.innerHTML = victoriasJugador
            revisarVidas(victoriasJugador, victoriasEnemgio, parrafoFinal, mostrarParrafos)
            indexAmbosOponentes(i, i)
            pJ.innerHTML = indexAtaqueJugador
            pE.innerHTML = indexAtaqueEnemigo
            parrafoJugador.appendChild(pJ)
            parrafoEnemigo.appendChild(pE)
        } else {
            mostrarParrafos.innerHTML = 'PERDISTE 😫'
            victoriasEnemgio++
            spanVidaMascotaEnemigo.innerHTML = victoriasEnemgio
            revisarVidas(victoriasJugador, victoriasEnemgio, parrafoFinal, mostrarParrafos)
            indexAmbosOponentes(i, i)
            pJ.innerHTML = indexAtaqueJugador
            pE.innerHTML = indexAtaqueEnemigo
            parrafoJugador.appendChild(pJ)
            parrafoEnemigo.appendChild(pE)
        }
    }
}

function revisarVidas(jugador, enemigo, mensajeFinal, mensajeDuelo) {
    if (jugador < enemigo) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        botonReinicio.style.display = 'block'
        mensajeDuelo.style.display = 'none'
        mensajeFinal.innerHTML = '💀 GANO LA MASCOTA DEL ENEMIGO 💀'
        botones.forEach((boton) => {
            boton.disabled = true
        })
    } else if (jugador > enemigo) {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        botonReinicio.style.display = 'block'
        mensajeDuelo.style.display = 'none'
        mensajeFinal.innerHTML = '🥳 GANASTE EL DUELO 🎉'
        botones.forEach((boton) => {
            boton.disabled = true
        })
    } else {
        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true
        botonReinicio.style.display = 'block'
        mensajeDuelo.style.display = 'none'
        mensajeFinal.innerHTML = 'EL DUELO TERMINÓ EN EMPATE 😵'
        botones.forEach((boton) => {
            boton.disabled = true
        })
    } 
}
// Funcion para cuando apretemos el boton de reiniciar nos recargue la pag y podamos volver a jugar
function reiniciar() {
    location.reload()
}
// Funcion donde seleccionamos un num aleatorio
function aleatorio (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
// Funcion donde pintamos el mokepon dentro del mapa creado
function pintarCanvas() {
    // Almacenamos la imagen del mokepon
    let imgMokepon = new Image()
    imgMokepon.src = mokeponSeleccionado.mapaFoto.src
    // Actualizamos la propiedad de volocidad del objeto
    mokeponSeleccionado.x = mokeponSeleccionado.x + mokeponSeleccionado.velocidadX
    mokeponSeleccionado.y = mokeponSeleccionado.y + mokeponSeleccionado.velocidadY
    // Limpiamos el mapa asi no vemos el arrastre el mokepon
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height)
    // Lo vamos dibujando pasandole la foto, el valor en x, en y, el alto y el ancho de la img
    mokeponSeleccionado.pintarMokepon()

    enviarPosicion(mokeponSeleccionado.x, mokeponSeleccionado.y)
    // por cada mokepon que se une los vamos pintando
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisaColision(mokepon)
    })
    // hipodogeObjetoEnemigo.pintarMokepon()
    // capipepoObjetoEnemigo.pintarMokepon()
    // ratigueyaObjetoEnemigo.pintarMokepon()
    // Revisamos si nuestro mokepon está en movimiento
    // Llamamos a la fn de colision pasandole como parámetro contra quien
    // if (mokeponSeleccionado.velocidadX !== 0 || mokeponSeleccionado.velocidadY !== 0) {
    //     revisaColision(hipodogeObjetoEnemigo)
    //     revisaColision(capipepoObjetoEnemigo)
    //     revisaColision(ratigueyaObjetoEnemigo)
    // }
}
// Funciones donde definimos los movimiento
function moverDer() {
    mokeponSeleccionado.velocidadX = 5
} 

function moverIzq() {
    mokeponSeleccionado.velocidadX = -5
} 

function moverAbajo() {
    mokeponSeleccionado.velocidadY = 5
} 

function moverArriba() {
    mokeponSeleccionado.velocidadY = -5
}
// Detenemos los movimientos cuando soltamos los botones
function detenerMovimiento() {
    mokeponSeleccionado.velocidadX = 0
    mokeponSeleccionado.velocidadY = 0
} 

function presionTecla(e) {
    switch (e.key) {
        case 'ArrowUp':
        case 'w':
            moverArriba()
            break
        case 'ArrowDown':
        case 's' :
            moverAbajo()
            break
        case 'ArrowLeft':
        case 'a':
            moverIzq()
            break
        case 'ArrowRight':
        case 'd':
            moverDer()
            break
        default:
            detenerMovimiento()
    } 
}

function iniciarMapa() {
    // Fn donde definimos el alto y ancho del mapa
    // Agregamos un intervalo donde recargamos el mapa en mms para poder mover el mokepon sin dejar el rastro
    // Agregamos los eventos a las declas o botones para movernos
    // mapa.width = 800
    // mapa.height = 600
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown', presionTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function revisaColision(enemigo) {
    // Donde empieza en el EJE Y (vertical)
    const arribaEnemigo = enemigo.y
    // Donde termina en el EJE Y
    const abajoEnemigo = enemigo.y + enemigo.alto
    // Donde termina de pintarse en el EJE X (horizontal)
    const derechaEnemigo = enemigo.x + enemigo.ancho
    // Donde empieza a pintarse en el EJE X
    const izquierdaEnemigo = enemigo.x

    // Donde empieza en el EJE Y (vertical)
    const arribaMascota = mokeponSeleccionado.y
     // Donde termina en el EJE Y
    const abajoMascota = mokeponSeleccionado.y + mokeponSeleccionado.alto
    // Donde termina de pintarse en el EJE X (horizontal)
    const derechaMascota = mokeponSeleccionado.x + mokeponSeleccionado.ancho
    // Donde empieza a pintarse en el EJE X
    const izquierdaMascota = mokeponSeleccionado.x

    if (
        // Comparamos si colicionamos o no 
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ) {
        return
    } else {
        detenerMovimiento()
        sectionAtaques.style.display = 'flex'
        sectionVerMapa.style.display = 'none'   
        // Removemos los evenListener para poder pelear normalmente ya que sino se seleccionaban varios ataques a la vez
        window.removeEventListener('keydown', presionTecla)
        window.removeEventListener('keyup', detenerMovimiento)
        // Llamamos a la fn de llamar al enemigo pasandole la colision
        seleccionarMascotaEnemigo(enemigo)
    }
}

// Funcion donde vamos a invocar el servicio que creamos en node para almacenar a los jugadores que se vayan uniendo al juego
function unirseAlJugo() {
    // Realizamos la peticion al servidor
    // fetch nos permite realizar llamadas a otros servicios por medio de HTTP, que metodo (GET, POST) y recibimos la respuesta que es async y poder manejar esos datos de respuesta por medio del metodo THEN
    fetch("http://localhost:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                // Recibimos la respuesta del Backend
                    .then(function (resp) {
                        jugadorId = resp 
                    })
            }
        } )
}

// Enviamos el dato de que mokepon seleccionamos al Backend
function seleccionarMokepon(mascotaJugador) {
    // URL definida en el Backend (a donde vamos a mandar la peticion) pasandole el ID del jugador
    fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
        method: "post", // Definimos que sea de tipo POST la peticion
        headers: { // Definimos que tipo de datos vamos a enviarle al Backend
            "Content-Type": "application/json"
        }, // Definimos que le vamos a enviar en el JSON
        // Acepta solo cadena de textos, por eso usamos esa fn para convertir los datos a ese tipo aceptable
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    }) // Como no espera respuesta no es necesario utilizar el then()
} 

// Creamos la funcion donde vamos a hacer la peticion al Backend pasandole la posicion en x, y
function enviarPosicion(x, y) {
    // Llamamos al endpoint creado en el Backend pasandole el ID del jugador que lo hace
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
        method: "post", // Indicamos que es tipo POST
        headers: { // Indicamos que vamos a mandar un JSON
            "Content-Type": "application/json"
        },
        // Convertimos el JSON en cadena de texto
        body: JSON.stringify({ 
            // Pasamos los datos
            // En este caso no hace falta seguir la regla de "clave": "valor" ya que estos tienen el mismo nombre, por ende, JavaScript asocia el valor y la clave
            x,
            y
        })
    }) // Utilzamos then ya que el endpoint nos devuelve un resultado, que en este caso son los demas jugadores que se unen
    .then(function (res) {
        // Chequeamos que recibimos correctamente la respuesta
        if (res.ok) {
            // Leemos los datos y estos vienen en formato JSON
            res.json() 
            // Como es una promesa, tambien debemos hacer uso de then
            // Podemos utilizar esta sintaxis de JavaScript (split) podmos separar las difrentes partes de la respuesta. Lo que hacemos es extraer el valor especifico de la respuesta (esta variable proviene del Backend, que enviamos en send)
                .then(function ({enemigos}) {
                    // Utilizamos map (similar a forEach) ya que este nos devuelve el valor con la nueva lista modificada
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        if (enemigo.mokepon != undefined) {
                            const mokeponNombre = enemigo.mokepon.nombre || "" 
                            let mokeponEnemigo = null
                            if (mokeponNombre === "Hipodoge") {
                                mokeponEnemigo = new Mokepon('Hipodoge', './assets/hipodoge.png', 3, './assets/hipodogeMapa.png', 200, 404)

                            } else if (mokeponNombre === "Capipepo") {
                                mokeponEnemigo = new Mokepon('Capipepo', './assets/capipepo.png', 3, './assets/capipepoMapa.png', 700, 250)

                            } else if (mokeponNombre === "Ratigueya"){
                                mokeponEnemigo = new Mokepon('Ratigueya', './assets/ratigueya.png', 3, './assets/ratigueyaMapa.png', 350, 100)
                            }
                            // Actualizamos los datos de las coordenadas de los mokepones nuevos a medida que se vayan uniendo
                            mokeponEnemigo.x = enemigo.x
                            mokeponEnemigo.y = enemigo.y
                            // devolvemos los valores (lo requiere map)
                            return mokeponEnemigo
                        }
                    })
                })
        }
    })
}