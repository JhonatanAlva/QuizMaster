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

async function obtenerPreguntasPorCategoriaYDificultad(categoria, dificultad) {
    const preguntasSnapshot = await preguntasCollection
        .where("Categoria", "==", categoria)
        .where("Dificultad", "==", dificultad)
        .get();    
    const preguntas = [];
    preguntasSnapshot.forEach(doc => {
        preguntas.push(doc.data()); 
    });
    return preguntas; 
}
window.addEventListener('DOMContentLoaded', async () => {
    const preguntasTableBody = document.querySelector('.preguntas');
    const searchForm = document.getElementById('searchForm');
    
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const categoria = document.getElementById('buscadorCategoria').value.trim();
        const dificultad = document.getElementById('buscadorDificultad').value.trim();
        
        const preguntas = await obtenerPreguntasPorCategoriaYDificultad(categoria, dificultad);
        preguntasTableBody.innerHTML = '';
        
        preguntas.forEach(pregunta => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${pregunta.Pregunta}</td>
                <td>${pregunta.Respuesta}</td>
                <td>${pregunta.Categoria}</td>
                <td>${pregunta.Dificultad}</td>
                <td>
                    <button class="btn btn-primary">
                        <img src="/Control/img/editar.png" alt="Modificar" style="width: 20px; height: 20px;">
                    </button>
                    <button class="btn btn-danger" onclick="eliminarPregunta('${pregunta.Pregunta}', '${pregunta.Respuesta}', '${pregunta.Categoria}', '${pregunta.Dificultad}')">
                        <img src="/Control/img/eliminar.png" alt="Eliminar" style="width: 20px; height: 20px;">
                    </button>
                </td>
            `;
            preguntasTableBody.appendChild(row);
        });
        
    });
});
async function eliminarPregunta(pregunta, respuesta, categoria, dificultad) {
    try {
        const querySnapshot = await preguntasCollection
            .where("Pregunta", "==", pregunta)
            .where("Respuesta", "==", respuesta)
            .where("Categoria", "==", categoria)
            .where("Dificultad", "==", dificultad)
            .get();
        
        querySnapshot.forEach(async doc => {
            await preguntasCollection.doc(doc.id).delete();
            alert("Pregunta eliminada correctamente");
            const categoria = document.getElementById('buscadorCategoria').value.trim();
            const dificultad = document.getElementById('buscadorDificultad').value.trim();
            const preguntasActualizadas = await obtenerPreguntasPorCategoriaYDificultad(categoria, dificultad);
            renderizarPreguntas(preguntasActualizadas);
        });
    } catch (error) {
        console.error("Error al eliminar la pregunta:", error);
    }
}

function renderizarPreguntas(preguntas) {
    const preguntasTableBody = document.querySelector('.preguntas');
    preguntasTableBody.innerHTML = '';
    preguntas.forEach(pregunta => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pregunta.Pregunta}</td>
            <td>${pregunta.Respuesta}</td>
            <td>${pregunta.Categoria}</td>
            <td>${pregunta.Dificultad}</td>
            <td>
                <button class="btn btn-primary">
                    <img src="/Control/img/editar.png" alt="Modificar" style="width: 20px; height: 20px;">
                </button>
                <button class="btn btn-danger" onclick="eliminarPregunta('${pregunta.Pregunta}', '${pregunta.Respuesta}', '${pregunta.Categoria}', '${pregunta.Dificultad}')">
                    <img src="/Control/img/eliminar.png" alt="Eliminar" style="width: 20px; height: 20px;">
                </button>
            </td>
        `;
        preguntasTableBody.appendChild(row);
    });
}


async function mostrarPreguntasIniciales() {
    const categoria = document.getElementById('buscadorCategoria').value.trim();
    const dificultad = document.getElementById('buscadorDificultad').value.trim();
    const preguntasIniciales = await obtenerPreguntasPorCategoriaYDificultad(categoria, dificultad);
    renderizarPreguntas(preguntasIniciales);
}

window.addEventListener('DOMContentLoaded', mostrarPreguntasIniciales);
