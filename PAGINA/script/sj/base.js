firebase.initializeApp({
    apiKey: "AIzaSyB6TK0bHCk35TeAbe0BqMGHWLxfjfEdGbI",
    authDomain: "quizmaster-38a6b.firebaseapp.com",
    databaseURL: "https://quizmaster-38a6b-default-rtdb.firebaseio.com",
    projectId: "quizmaster-38a6b",
    storageBucket: "quizmaster-38a6b.appspot.com",
    messagingSenderId: "169546556534",
    appId: "1:169546556534:web:cc7dbfb16ccbf639e92b57",
    measurementId: "G-FQSP9SF6PM"
});

const preguntasCollection = firebase.firestore().collection("Preguntas");
let preguntas = [];
let preguntaIndex = 0;


async function obtenerRespuestasIncorrectas() {
    const respuestasSnapshot = await preguntasCollection.get();
    const respuestas = respuestasSnapshot.docs.flatMap(doc => doc.data().Respuesta);
    return respuestas;
}
async function obtenerPreguntasAleatorias() {
    const categoria = localStorage.getItem("categoria");
    const dificultad = localStorage.getItem("dificultad");

    console.log(categoria, dificultad);
    const preguntasSnapshot = await preguntasCollection
        .where("Categoria", "==", categoria)
        .where("Dificultad", "==", dificultad)
        .get();
    preguntas = preguntasSnapshot.docs.map(doc => doc.data());
    preguntas.sort(() => Math.random() - 0.5);
    mostrarPregunta();
}



async function mostrarPregunta() {
    const preguntaContainer = document.getElementById('preguntaContainer');
    const pregunta = document.getElementById('pregunta');
    const respuestasContainer = document.getElementById('respuestas');

    if (preguntaIndex < 5) {
        const currentQuestion = preguntas[preguntaIndex];
        pregunta.textContent = currentQuestion.Pregunta;
        respuestasContainer.innerHTML = '';
        const respuestasIncorrectas = await obtenerRespuestasIncorrectas();
        const respuestas = [currentQuestion.Respuesta, ...respuestasIncorrectas];
        const indexRespuestaCorrecta = respuestas.indexOf(currentQuestion.Respuesta);
        if (indexRespuestaCorrecta !== -1) {
            respuestas.splice(indexRespuestaCorrecta, 1);
        }

        const respuestasAleatorias = obtenerMuestraAleatoria(respuestas, 3);
        respuestasAleatorias.push(currentQuestion.Respuesta);
        respuestasAleatorias.sort(() => Math.random() - 0.5);
        respuestasAleatorias.forEach(respuesta => {
            const botonRespuesta = document.createElement('button');
            botonRespuesta.textContent = respuesta;
            botonRespuesta.classList.add('btn', 'btn-primary', 'me-2');
            botonRespuesta.onclick = function () {
                if (respuesta === currentQuestion.Respuesta) {
                    // Respuesta correcta, avanzar a la siguiente pregunta
                    preguntaIndex++;
                    mostrarPregunta();
                } else {
                    // Respuesta incorrecta
                    respuestaIncorrecta(); // Aquí llamamos a la función respuestaIncorrecta()
                    alert('Respuesta incorrecta. Intenta de nuevo.');
                }
            };
            respuestasContainer.appendChild(botonRespuesta);
        });

    } else {
        alert("Fin del juego")
        window.location.href = "/Lobby/index.html";
        return;
    }
}


function obtenerMuestraAleatoria(array, size) {
    const muestra = [];
    const copiaArray = array.slice();
    for (let i = 0; i < size; i++) {
        const index = Math.floor(Math.random() * copiaArray.length);
        muestra.push(copiaArray.splice(index, 1)[0]);
    }
    return muestra;
}

window.addEventListener('DOMContentLoaded', async () => {
    await obtenerPreguntasAleatorias();
});

let vidas = 3;

function actualizarVidas() {
    document.getElementById('vidas').textContent = vidas;
}

function finDelJuego() {
    alert('¡Fin del juego!');
    window.location.href = "/Lobby/index.html"; // Redirigir al usuario al lobby
}

function respuestaCorrecta() {
    console.log('Respuesta correcta');
}

function respuestaIncorrecta() {
    vidas--;
    actualizarVidas();

    if (vidas === 0) {
        finDelJuego();
    }
    console.log('Respuesta incorrecta');
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("regresarLobby").addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            window.location.href = "/Lobby/index.html";
        } catch (error) {
            console.error("Error al salir ", error);
            alert("Ocurrió un error al cerrar sesión");
        }
    });
  });