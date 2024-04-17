// Agregamos una variable global para contar las vidas
var vidas = 3;

function mostrarNiveles(categoria) {
    // Supongamos que aquí obtienes los niveles de dificultad según la categoría seleccionada
    var niveles = obtenerNivelesDeDificultad(categoria);
  
    // Muestra los niveles en el marco central
    var nivelesHTML = '';
    niveles.forEach(function(nivel) {
      nivelesHTML += '<button onclick="iniciarJuego(\'' + categoria + '\', \'' + nivel + '\')">' + nivel + '</button>';
    });
    document.getElementById('niveles').innerHTML = nivelesHTML;
    document.getElementById('juego').innerHTML = '';
    // Mostrar las vidas
    actualizarVidas();
  }
  
  function iniciarJuego(categoria, nivel) {
    // Oculta los botones de nivel
    document.getElementById('niveles').innerHTML = '';
  
    // Mostrar el conteo regresivo antes de iniciar el juego
    var conteo = 5;
    var conteoInterval = setInterval(function() {
      document.getElementById('juego').innerHTML = "<div id='mensajeConteo'>El juego comenzará en " + conteo + " segundos</div>";
      conteo--;
      if (conteo < 0) {
        clearInterval(conteoInterval);
        // Ocultar el mensaje de conteo después de que termine el conteo
        document.getElementById('mensajeConteo').style.display = "none";
        // Supongamos que aquí inicias el juego según la categoría y el nivel seleccionado
        var juegoHTML = 'Juego iniciado para la categoría: ' + categoria + ', Nivel: ' + nivel;
        document.getElementById('juego').innerHTML = juegoHTML;
        // Simular respuesta incorrecta
        if (Math.random() < 0.5) { // Probabilidad de respuesta incorrecta del 50%
          disminuirVidas(); // Disminuir vidas si la respuesta es incorrecta
        }
      }
    }, 1000);
    // Llamar a la función para obtener las preguntas y respuestas desde la base de datos
  var preguntas = obtenerPreguntas(categoria, nivel);

  // Mostrar las preguntas y respuestas en el div de juego
  var juegoHTML = '<h3>Preguntas:</h3>';
  preguntas.forEach(function(pregunta, index) {
    juegoHTML += '<div id="pregunta' + index + '">' + pregunta.texto + '</div>';
    juegoHTML += '<div id="respuestas' + index + '">';
    pregunta.respuestas.forEach(function(respuesta, rIndex) {
      juegoHTML += '<input type="radio" id="respuesta' + rIndex + '" name="pregunta' + index + '">' + respuesta.texto + '</input><br>';
    });
    juegoHTML += '</div>';
  });

  document.getElementById('juego').innerHTML = juegoHTML;
  }

  function disminuirVidas() {
    vidas--; // Disminuir las vidas
    actualizarVidas(); // Actualizar la representación de las vidas
  }

  function actualizarVidas() {
    // Limpiar las vidas anteriores
    document.getElementById('vidas').innerHTML = '';
  
    // Agregar las imágenes de los corazones según la cantidad de vidas restantes
    for (var i = 0; i < vidas; i++) {
      document.getElementById('vidas').innerHTML += '♥️';
    }
  }
  
  // Función simulada para obtener los niveles de dificultad
  function obtenerNivelesDeDificultad(categoria) {
    // Aquí simulas la obtención de los niveles de dificultad según la categoría
    // Retorna un array de niveles, por ejemplo:
    if (categoria === 'categoria1') {
      return ['Fácil', 'Intermedio', 'Difícil'];
    } else if (categoria === 'categoria2') {
      return ['Fácil', 'Intermedio', 'Difícil'];
    } else if (categoria === 'categoria3') {
      return ['Fácil', 'Intermedio', 'Difícil'];
    }
  }
  
  function confirmarCambio(categoria) {
    var confirmacion = confirm("¿Estás seguro que quieres cambiar de categoría? Perderás todo el progreso.");
    if (confirmacion) {
        mostrarNiveles(categoria);
    }
}
