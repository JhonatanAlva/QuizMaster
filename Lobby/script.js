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
    document.querySelectorAll(".boton").forEach(function(boton) {
        boton.addEventListener("click", function() {
            localStorage.setItem("categoria", this.id);
            document.getElementById("modal").style.display = "block";
        });
    });

    document.querySelectorAll(".dificultad").forEach(function(boton) {
        boton.addEventListener("click", function() {
            const categoria = localStorage.getItem("categoria");
            localStorage.setItem("dificultad", this.id);
            document.getElementById("modal").style.display = "none";
            window.location.href = "/PAGINA/preguntas.html";
        });
    });

    document.getElementById("cerrarModal").addEventListener("click", function() {
        document.getElementById("modal").style.display = "none";
    });
});
