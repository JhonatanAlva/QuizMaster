document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("regresarLobby").addEventListener("click", async (event) => {
      event.preventDefault();
      try {
          window.location.href = "/LoginQuiz/LoginQuiz.html";
      } catch (error) {
          console.error("Error al salir ", error);
          alert("Ocurrió un error al cerrar sesión");
      }
  });
});
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("geografiaP").addEventListener("click", async (event) => {
      event.preventDefault();
      try {
          window.location.href = "/PAGINA/preguntas.html";
      } catch (error) {
          console.error("Error al salir ", error);
          alert("Ocurrió un error al cerrar sesión");
      }
  });
});

