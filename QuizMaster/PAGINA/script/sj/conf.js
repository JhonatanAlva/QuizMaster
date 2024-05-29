  // Función para cambiar de categoría
  function cambiarCategoria(categoria) {
    console.log("Cambiando la categoría: " + categoria)
    //lógica adicional para cambiar la categoría
  }

  // Función para manejar el nombre de usuario
  function mostrarNombreUsuario(nombreUsuario) {
    document.getElementById("usuario").innerText = nombreUsuario
  }

  // Simula la obtención del nombre de usuario (reemplaza esto con tu lógica real)
  var nombreUsuario = "Usuario Nuevo";

  // Muestra el nombre de usuario al cargar la página
  window.addEventListener("DOMContentLoaded", function() {
    mostrarNombreUsuario(nombreUsuario)
  });

  // Manejar el evento de clic en el botón de salida (si lo tienes)
  document.getElementById("logoutButton").addEventListener("click", function() {
    // la lógica para cerrar sesión
  });