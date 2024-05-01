  // Función para manejar el nombre de usuario
  function mostrarNombreUsuario(nombreUsuario) {
    document.getElementById("usuario").innerText = nombreUsuario
  }

  // Simula la obtención del nombre de usuario (reemplaza esto con tu lógica real)
  var nombreUsuario = "Usuario Nuevo";

  window.addEventListener("DOMContentLoaded", function() {
    mostrarNombreUsuario(nombreUsuario)
  });