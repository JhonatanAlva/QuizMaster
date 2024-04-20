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
const db = firebase.firestore();

window.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const buttonRegistrePregunta = document.getElementById("buttonRegistrePregunta");

    buttonRegistrePregunta.addEventListener("click", async (event) => {
        event.preventDefault();
        const preguntaregist = document.getElementById("preguntarregis").value;
        const respuestaRegis = document.getElementById("respuestaregis").value;
        const categoria = document.getElementById("categoriaregis").value;
        const subCategoria = document.getElementById("subcategoria").value;
        const dificultad = document.getElementById("niveldificultadregis").value;
        try {
            

            await db.collection("Preguntas").add({
                Pregunta: preguntaregist,
                Respuesta: respuestaRegis,
                Categoria: categoria,
                SubCategoria: subCategoria,
                Dificultad: dificultad
            });
            alert("Pregunta registrada con éxito");
            document.getElementById("preguntarregis").value = "";
            document.getElementById("respuestaregis").value = "";
            document.getElementById("categoriaregis").value = "";
            document.getElementById("subcategoria").value = "";
            document.getElementById("niveldificultadregis").value = "";

        } catch (error) {
            console.error("Error al añadir Pregunta: ", error);
            alert("Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo.");
        }
    });
});

const preguntasCollection = firebase.firestore().collection("Categorias");

window.addEventListener('DOMContentLoaded', async () => {
    const categoriasSelect = document.getElementById("categoriaregis");
    
    try {
        const categorias = await obtenerCategorias();
        categorias.forEach(categoria => {
            const option = document.createElement('option');
            option.textContent = categoria;
            categoriasSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Error al obtener categorías: ", error);
    }
    const addCategoryButton = document.getElementById("addCategoryButton");
    addCategoryButton.addEventListener("click", async () => {
        const newCategory = prompt("Ingrese el nombre de la nueva categoría:");
        if (newCategory) {
            try {
                await db.collection("Categorias").add({ nameCategory: newCategory });
                const categoriasSelect = document.getElementById("categoriaregis");
                const option = document.createElement('option');
                option.textContent = newCategory;
                categoriasSelect.appendChild(option);
                
                alert("Categoría agregada con éxito");
            } catch (error) {
                console.error("Error al agregar la categoría: ", error);
                alert("Ocurrió un error al agregar la categoría. Por favor, inténtelo de nuevo.");
            }
        }
    });

});

async function obtenerCategorias() {
    const preguntasSnapshot = await preguntasCollection.get();
    const categorias = new Set(); 
    preguntasSnapshot.forEach(doc => {
        categorias.add(doc.data().nameCategory); 
    });
    return Array.from(categorias); 
}