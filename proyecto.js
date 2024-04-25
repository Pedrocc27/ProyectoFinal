//Primera prueba
var questions = [
  "Número de 3 dígitos. El dígito que está en el medio es 4 veces mayor que el tercer y último dígito. Además, el primero es 3 unidades más pequeño que el segundo. ¿Qué número es?",
  "Hay 25 caballos. ¿Cuál es el mínimo de carreras necesarias que debes analizar para descubrir a los 3 caballos más veloces? Puedes hacer correr un máximo de 5 caballos a la vez, pero no tienes reloj ni ninguna herramienta de medición.",
  "La suma de un palo y una pelota de golf es de 1'10 euros. El palo supera el precio de la pelota en un euro. ¿Cuánto cuesta la pelota?",
  "¿Qué ocurre una en un minuto, dos veces en un momento y nunca en cien años?",
  "5 gatos pueden coger 5 ratones en 5 minutos. ¿Cuántos gatos se necesita para coger 100 ratones en 100 minutos?",
  "Un granjero tiene 40 cerdos, 10 conejos y 20 caballos. Si llamas 'caballos' a los 'cerdos', ¿cuántos caballos tendrá ahora?",
  "En su cajón de calcetines hay 6 calcetines verdes, 4 calcetines azules, 8 calcetines negros, y 2 calcetines rojos. Si está oscuro y no puede ver los colores, ¿cuántos calcetines debería sacar para asegurarse de que tiene un conjunto?",
  "Un hombre sin techo recoge colillas de cigarrillos de la calle. Puede hacer un cigarro con cinco colillas. Hoy está de suerte, ha encontrado 25 colillas. ¿Cuántos cigarrillos podrá hacer?"
];

var answers = [
  "141",
  "7",
  "0.05",
  "Letra m",
  "5",
  "20",
  "5",
  "6"
];

var currentQuestionIndex = 0;

function startGame() {
var playerName = document.getElementById("player-name").value;
if (playerName.trim() === "") {
  alert("Por favor, ingrese su nombre.");
} else {
  document.getElementById("player-setup").style.display = "none";
  document.getElementById("game-instructions").style.display = "block";
  document.getElementById("welcome-message").innerText = playerName;
}
}

function beginGame() {
document.getElementById("game-instructions").style.display = "none";
document.getElementById("puzzle").style.display = "block";
displayQuestion();
startCountdown();
}

function displayQuestion() {
var question = questions[currentQuestionIndex];
document.getElementById("question").innerText = question;
}

var preguntasRespondidas = 0;

function checkAnswer() {
  var userAnswer = document.getElementById("answer-input").value.toLowerCase();
  var correctAnswer = answers[currentQuestionIndex].toLowerCase();

  if (userAnswer === correctAnswer) {
    document.getElementById("feedback").innerText = "¡Respuesta correcta!";
    preguntasRespondidas++;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      document.getElementById("answer-input").value = "";
    } else {
      document.getElementById("answer-input").style.display = "none";
      document.getElementById("feedback").style.color = "green";
      if (preguntasRespondidas === questions.length) {
        mostrarMensajeTemporizado("¡Has acertado todas las preguntas!", mostrarSopaLetras, 3000);
      } else {
        mostrarSopaLetras();
      }
    }
  } else {
    document.getElementById("feedback").innerText = "Respuesta incorrecta. Inténtalo de nuevo.";
    document.getElementById("answer-input").value = "";
  }
}

function mostrarSopaLetras() {
  document.getElementById("puzzle").style.display = "none";
  document.getElementById("word-search").style.display = "block";
  document.getElementById("word-search-info").style.display = "block"; // Muestra la información de la sopa de letras

  // Actualiza la cantidad de palabras y el tema
  var wordCount = words.length;
  var wordTheme = "animales"; // Cambia esto por el tema que desees
  document.getElementById("word-count").textContent = wordCount;
  document.getElementById("word-theme").textContent = wordTheme;

  generatePuzzle();
  startCountdown();
}

function mostrarMensajeTemporizado(mensaje, callback, duracion) {
  document.getElementById("feedback").innerText = mensaje;
  setTimeout(callback, duracion);
}

var remainingSeconds = 30 * 60; // Variable para almacenar el tiempo restante

function startCountdown() {
  var countdownElement = document.getElementById("countdown");
  var interval = setInterval(function() {
    var minutes = Math.floor(remainingSeconds / 60);
    var seconds = remainingSeconds % 60;
    countdownElement.textContent = padZero(minutes) + ":" + padZero(seconds);
    remainingSeconds--; // Disminuir el tiempo restante en cada iteración

    // Detener el contador cuando el tiempo restante sea menor o igual a 0
    if (remainingSeconds <= 0) {
      clearInterval(interval);
      countdownElement.textContent = "¡Tiempo agotado!";
      document.getElementById("word-search").style.display = "none"; // Ocultar la sopa de letras
      document.getElementById("game-instructions").style.display = "none";
      var skullImage = document.createElement("img");
      skullImage.src = "https://i.gifer.com/RV8K.gif";
      skullImage.style.width = '500px';
      skullImage.style.height = 'auto';
      skullImage.style.display = 'block'; 
      skullImage.style.margin = '0 auto';
      document.body.appendChild(skullImage);
    }
  }, 1000);
}

function padZero(number) {
return (number < 10 ? '0' : '') + number;
}

// Variables globales
var words = ["GATO", "PERRO", "CONEJO", "PAJARO", "TIGRE", "LEON", "ELEFANTE", "JIRAFA", "COCODRILO", "CANGURO"];
var puzzleSize = 10; // Tamaño del puzzle (10x10)

// Función para generar la sopa de letras y colocar las palabras
function generatePuzzle() {
  var puzzle = document.getElementById("puzzlez");
  for (var i = 0; i < puzzleSize * puzzleSize; i++) {
    var cell = document.createElement("div");
    puzzle.appendChild(cell);
  }
  placeWords(puzzle);
  fillEmptyCells(puzzle);
}

// Definir las orientaciones posibles
var orientations = [
  { dx: 1, dy: 0 },    // Horizontal
  { dx: 0, dy: 1 },    // Vertical
  { dx: 1, dy: 1 },    // Diagonal hacia abajo
  { dx: -1, dy: 1 },   // Diagonal hacia arriba
  { dx: 1, dy: -1 },   // Diagonal hacia abajo-invertida
  { dx: -1, dy: -1 },  // Diagonal hacia arriba-invertida
  { dx: -1, dy: 0 },   // Horizontal invertida
  { dx: 0, dy: -1 }    // Vertical invertida
];

// Función para colocar las palabras en el panel
function placeWords(puzzle) {
  for (var i = 0; i < words.length; i++) {
    var word = words[i].toUpperCase(); // Convertir la palabra a mayúsculas
    var orientation = Math.floor(Math.random() * orientations.length); // Seleccionar una orientación aleatoria
    var startX = Math.floor(Math.random() * puzzleSize);
    var startY = Math.floor(Math.random() * puzzleSize);
    var dx = orientations[orientation].dx;
    var dy = orientations[orientation].dy;

    if (isValidPosition(startX, startY, word.length, dx, dy, puzzle)) { // Comprueba si se puede colocar la palabra en esa posición
      placeWord(word, startX, startY, dx, dy, puzzle);
    } else {
      // Intenta colocar la palabra en otra posición
      i--;
    }
  }
}

// Función para rellenar las celdas vacías con letras aleatorias
function fillEmptyCells(puzzle) {
  for (var i = 0; i < puzzleSize * puzzleSize; i++) {
    var cell = puzzle.children[i];
    if (cell.innerText === "") { // Se verifica si la celda está vacía
      cell.innerText = getRandomLetter(); // Si no lo está, se añade una letra aleatoria
    }
  }
}

function getRandomLetter() {
  var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet.charAt(Math.floor(Math.random() * alphabet.length)); // Math.random genera un número decimal de 0 a 1 y math.floor redonde al más bajo para asegurarnos un número del 1 al 25
  // Después asocia el número a la letra y se genera una letra aleatoria del abecedario
}

// Función para verificar si una posición es válida para colocar una palabra
function isValidPosition(x, y, length, dx, dy, puzzle) {
  var endX = x + (length - 1) * dx;
  var endY = y + (length - 1) * dy;

  if (endX < 0 || endX >= puzzleSize || endY < 0 || endY >= puzzleSize) {
    return false;
  }

  for (var i = 0; i < length; i++) {
    var cell = puzzle.children[x + i * dx + (y + i * dy) * puzzleSize];
    if (cell.innerText !== "") {
      return false;
    }
  }

  return true;
}

// Función para colocar una palabra en el panel
function placeWord(word, startX, startY, dx, dy, puzzle) {
  for (var i = 0; i < word.length; i++) {
    var cell = puzzle.children[startX + i * dx + (startY + i * dy) * puzzleSize];
    cell.innerText = word.charAt(i);
    cell.dataset.word = word; // Agregar el atributo "data-word" para identificar la palabra en la celda
  }
}

var palabrasEncontradas = 0;

function checkWord() {
  var inputWord = document.getElementById("word-input").value.toUpperCase(); // Convertir la palabra ingresada a mayúsculas
  var puzzle = document.getElementById("puzzlez");
  var wordFound = false;

  for (var i = 0; i < puzzle.children.length; i++) {
    var cell = puzzle.children[i];
    if (cell.innerText === inputWord.charAt(0)) { // Si encontramos la primera letra de la palabra
      var startX = Math.floor(i % puzzleSize);
      var startY = Math.floor(i / puzzleSize);

      // Verificar en todas las direcciones
      for (var j = 0; j < orientations.length; j++) {
        var dx = orientations[j].dx;
        var dy = orientations[j].dy;
        var x = startX;
        var y = startY;
        var wordMatch = true;

        // Verificar si la palabra coincide en esta dirección
        for (var k = 0; k < inputWord.length; k++) {
          if (x < 0 || x >= puzzleSize || y < 0 || y >= puzzleSize || puzzle.children[x + y * puzzleSize].innerText !== inputWord.charAt(k)) {
            wordMatch = false;
            break;
          }
          x += dx;
          y += dy;
        }

        if (wordMatch) { // Si la palabra coincide en esta dirección
          wordFound = true;
          x = startX;
          y = startY;

          // Marcar la palabra en verde en el panel
          for (var k = 0; k < inputWord.length; k++) {
            puzzle.children[x + y * puzzleSize].style.color = "green";
            x += dx;
            y += dy;
          }
          break;
        }
      }
    }
  }

  // Dar retroalimentación al usuario
  if (wordFound) {
    document.getElementById("word-feedback").innerText = "¡Palabra encontrada!";
    document.getElementById("word-feedback").style.color = "green";
    palabrasEncontradas++;
  } else {
    document.getElementById("word-feedback").innerText = "Palabra no encontrada. Inténtalo de nuevo.";
    document.getElementById("word-feedback").style.color = "red";
  }
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    document.getElementById("answer-input").value = "";
  }
  if (palabrasEncontradas === 10) {
    mostrarMensajeTemporizado2("¡Has encontrado todas las palabras!", mostrarBanderas, 3000);
  } 
}

function mostrarBanderas() {
  document.getElementById("word-search").style.display = "none"; // Oculta la sopa de letras
  document.getElementById("memory-game").style.display = "block"; // Muestra el juego de las banderas
  document.getElementById("game-instructions").style.display = "none";
}

function mostrarMensajeTemporizado2(mensaje, callback, duracion) {
  document.getElementById("feedback").innerText = mensaje;
  if (palabrasEncontradas === 10) {
    setTimeout(callback, duracion);
  } else {
    setTimeout(mostrarSopaLetras, duracion);
  }
}

const flags = [
  { name: 'Estados Unidos', image: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg' },
  { name: 'China', image: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' },
  { name: 'Brasil', image: 'https://upload.wikimedia.org/wikipedia/en/0/05/Flag_of_Brazil.svg' },
  { name: 'Corea del Norte', image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Flag_of_North_Korea.svg' },
  { name: 'Canadá', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg' },
  { name: 'Nueva Zelanda', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Flag_of_New_Zealand.svg' },
  { name: 'Uganda', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Flag_of_Uganda.svg' },
  { name: 'India', image: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg' },
  { name: 'Suecia', image: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Flag_of_Sweden.svg' },
  { name: 'Colombia', image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg' }
];
let sequence = [];
let currentIndex = 0;
let userSequence = [];

function displayFlag(flag) {
  const flagContainer = document.getElementById('flag-container');
  const img = document.createElement('img');
  img.src = flag.image;
  img.alt = flag.name;
  img.dataset.name = flag.name;
  flagContainer.innerHTML = '';
  flagContainer.appendChild(img);
}

function showInstructions() {
  const instructions = document.getElementById('instructions');
  instructions.style.display = 'none'; // Oculta las instrucciones
  startFlag(); // Inicia el juego
}

document.getElementById('start-button').addEventListener('click', showInstructions);

function startFlag() {
  sequence = generateSequence(flags.length);
  currentIndex = 0;
  userSequence = [];
  displayFlag(flags[sequence[currentIndex]]);
}

function generateSequence(length) {
  const sequence = [];
  const availableFlags = Array.from({ length: length }, (_, i) => i); // Creamos un array de índices de banderas disponibles
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableFlags.length);
    sequence.push(availableFlags[randomIndex]);
    availableFlags.splice(randomIndex, 1); // Eliminamos el índice usado para evitar repeticiones
  }
  return sequence;
}

function checkAnswerFlag() {
  const playerAnswer = document.getElementById('player-answer').value.trim().toLowerCase();
  if (playerAnswer === flags[sequence[currentIndex]].name.toLowerCase()) {
    document.getElementById('result').textContent = '¡Respuesta correcta!';
    if (currentIndex < sequence.length - 1) {
      currentIndex++;
      setTimeout(() => {
        displayFlag(flags[sequence[currentIndex]]);
        document.getElementById('result').textContent = '';
        document.getElementById('player-answer').value = '';
      }, 1000); // Espera 1 segundo antes de mostrar la siguiente bandera
    } else {
      document.getElementById('result').textContent = '¡Correcto! Ahora, introduce la secuencia en el orden correcto:';
      displayUserSequenceInput();
      document.getElementById('flag-container').style.display = 'none';
      document.getElementById('player-answer').style.display = 'none';
      document.getElementById('check-answer').style.display = 'none';
    }
  } else {
    document.getElementById('result').textContent = 'Respuesta incorrecta. Inténtalo de nuevo.';
  }
}

function displayUserSequenceInput() {
  const userSequenceContainer = document.getElementById('user-sequence-container');
  userSequenceContainer.innerHTML = '';
  for (let i = 0; i < flags.length; i++) {
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `input-${i}`;
    input.placeholder = `Bandera ${i + 1}`;
    userSequenceContainer.appendChild(input);
  }
  document.getElementById('check-sequence').style.display = 'block';
}

function checkSequence() {
  let correct = true;
  for (let i = 0; i < flags.length; i++) {
    const userInput = document.getElementById(`input-${i}`).value.trim().toLowerCase();
    if (userInput !== flags[sequence[i]].name.toLowerCase()) {
      correct = false;
      break;
    }
  }
  if (correct) {
    document.getElementById('result').textContent = '¡Correcto! Has completado la prueba de memoria.';
    mostrarMensajeExito();
  } else {
    document.getElementById('result').textContent = '¡Incorrecto! La secuencia no es correcta. Inténtalo de nuevo.';
  }
}

function mostrarMensajeExito() {
  // Oculta el contenedor de las banderas y el formulario de respuesta
  document.getElementById('flag-container').style.display = 'none';
  document.getElementById('user-sequence-container').style.display = 'none';
  document.getElementById('check-sequence').style.display = 'none';
  document.getElementById('memory-game').style.display = 'none';

  document.body.innerHTML = '';

  var successMessage = document.createElement('h1');
  successMessage.textContent = 'FINAL';
  successMessage.style.textAlign = 'center'; // Centra el contenido del h2
  document.body.appendChild(successMessage);

  // Crea un elemento <h2> para mostrar el mensaje de éxito
  var successMessage = document.createElement('h2');
  successMessage.textContent = '¡Lo has conseguido!';
  successMessage.style.textAlign = 'center';
  document.body.appendChild(successMessage);

  // Crea un elemento <img> para mostrar el GIF
  var gifImage = document.createElement('img');
  gifImage.src = 'https://i.gifer.com/SQ4x.gif';
  gifImage.style.width = '300px';
  gifImage.style.height = 'auto';
  gifImage.style.display = 'block'; 
  gifImage.style.margin = '0 auto';
  document.body.appendChild(gifImage);
}

//document.getElementById('start-button').addEventListener('click', startGame);
// document.getElementById('check-answer').addEventListener('click', checkAnswer);
document.getElementById('check-sequence').addEventListener('click', checkSequence);
document.getElementById('check-sequence').style.display = 'none';

