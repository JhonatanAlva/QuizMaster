
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
      }
    }, 1000);

  document.getElementById('juego').innerHTML = juegoHTML;
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
  } else if (categoria === 'categoria4') {
    return ['Fácil', 'Intermedio', 'Difícil'];
  }
}

// Función para mostrar niveles de dificultad según la categoría seleccionada
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
}

function confirmarCambio(categoria) {
  var confirmacion = confirm("¿Estás seguro que quieres cambiar de categoría? Perderás todo el progreso.");
  if (confirmacion) {
      mostrarNiveles(categoria);
  }
}
