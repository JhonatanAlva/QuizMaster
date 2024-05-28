//Botones para controlar iniciar seccion o crear cuenta
const btnInicioSeccion = document.getElementById("iniciarSesion");
const btnRegistrar = document.getElementById("regist");
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");
//Cambiar de perspectiva de registrar o iniciar 
btnInicioSeccion.addEventListener("click", () => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

btnRegistrar.addEventListener("click", () => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});
//Conexion de base de datos
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
//Funcion de registra usuario
const db = firebase.firestore();
const formularioRegistro = document.querySelector(".forms");
document.getElementById("buttonRegistre").addEventListener("click", async (event) => {
    event.preventDefault();
    const nombreUsuario = document.getElementById("nameUserRegist").value;
    const correoElectronico = document.getElementById("emailUserRegist").value;
    const password = document.getElementById("password-registr").value;
    const edad = document.getElementById("age-registr").value;
    try {
        //Validar que nombre de usuario y correo no existan en la base de datos
        const querySnapshot = await db.collection("User").where("Correo", "==", correoElectronico).get();
        const querySnapshotNameUser = await db.collection("User").where("NameUser", "==", nombreUsuario).get();
        if (!querySnapshot.empty) {
            alert("Ya existe un usuario registrado con este correo electrónico. Por favor, inicie sesión o utilice otro correo electrónico.");
            return;
        }
        if (!querySnapshotNameUser.empty) {
            alert("Ya existe un usuario registrado con este nombre. Por favor, inicie sesión o utilice otro nombre de usuario.");
            return;
        }
        //Json para mandarlo al base a la base de datos 
        await db.collection("User").add({
            NameUser: nombreUsuario,
            Correo: correoElectronico,
            Password: password,
            Edad: edad,
            fichas: 10
        });
        alert("Usuario registrado con éxito");
        //Vaciar inputs
        document.getElementById("nameUserRegist").value = "";
        document.getElementById("emailUserRegist").value = "";
        document.getElementById("password-registr").value = "";
        document.getElementById("age-registr").value = "";
        //Mover a ventana inciar seccion 
        formRegister.classList.add("hide");
        formLogin.classList.remove("hide");

    } catch (error) {
        console.error("Error al añadir usuario: ", error);
        alert("Ocurrió un error al registrar el usuario. Por favor, inténtelo de nuevo.");
    }
});
const logUser = document.querySelector(".forms");
//Funcion de iniciar seccion 
document.getElementById("buttonInciar").addEventListener("click", async (event) => {
    event.preventDefault();
    const userNameLogin = document.getElementById("nameUserLogin").value;
    const passwordLogin = document.getElementById("password-login").value;
    localStorage.setItem("nameUserLogi", userNameLogin);

    try {
        //Verificar existencia de usuario
        const querySnapshot = await db.collection("User").where("NameUser", "==", userNameLogin).where("Password", "==", passwordLogin).get();
        //Validad si es usuario normal o usuario de administrador
        if (!querySnapshot.empty) {
            if (userNameLogin === "Admin") { 
                window.location.href = "/Control/InicioControl/control.html";
            } else {
                window.location.href = "/Lobby/index.html";
            }
        }else {
            alert("El nombre de usuario o la contraseña son incorrectos.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión: ", error);
        alert("Ocurrió un error al intentar iniciar sesión. Por favor, inténtelo de nuevo.");
    }
});

