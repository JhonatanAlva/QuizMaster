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
  
    // Supongamos que aquí inicias el juego según la categoría y el nivel seleccionado
    var juegoHTML = 'Juego iniciado para la categoría: ' + categoria + ', Nivel: ' + nivel;
    document.getElementById('juego').innerHTML = juegoHTML;
    // Simular respuesta incorrecta
    if (Math.random() < 0.5) { // Probabilidad de respuesta incorrecta del 50%
    disminuirVidas(); // Disminuir vidas si la respuesta es incorrecta
    }
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
  