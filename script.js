// Defining Game Parts
const Player_1 = "X";
const Player_2 = "O";
let currentPlayer = "X";

// Elements
const cells = document.querySelectorAll(".cell");
const gameOverText = document.getElementById("game-over-text");
const restartBtn = document.getElementById("restartBtn");


// Sounds
//const clickSound = new Audio("sounds/arcade-click.wav");
//const youLoseSound = new Audio("sounds/fairytale-game-over.wav");


// Initialize Game
const winCombinations = [
    // Rows
    { combo: [0, 1, 2]},
    { combo: [3, 4, 5]},
    { combo: [6, 7, 8]},
    // Columns
    { combo: [0, 3, 6]},
    { combo: [1, 4, 7]},
    { combo: [2, 5, 8]},
    // Diagonals
    { combo: [0, 4, 8]},
    { combo: [2, 4, 6]}
  ];

  let running = false;

// Game Functions
startGame();
function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClick));
}    

function cellClick(event) {
    const id = event.target.id;
    if (!cells[id]) {
    cells[id] = currentPlayer;
    event.target.innerText = currentPlayer;
    }
}

checkWinner();
function checkWinner() {
    let wonRound = false;
//   console.log(winCombinations[0].combo);
    for (let i = 0; i < 8; i++) {
      const combo = winCombinations[i];
      const cellA = combo[0];
      const cellB = combo[1];
      const cellC = combo[2];


      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }
      if (cellA == cellB && cellB == cellC) {
        wonRound = true;
        break;
      }
    }

    if (wonRound) {
      gameOverText.textContent = `${currentPlayer} wins!`;
      running = false;
      
    } else if (!options.includes("")) {
      gameOverText.textContent = `Cat Game!`;
      running = false;
     
    } else {
      changePlayer();

    }
}
    function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    // console.log(gameOverText)
    gameOverText.textContent = `${currentPlayer}'s turn`;
  }

restartBtn.addEventListener("click", resetBoard);
gameOverText.textContent = `${currentPlayer}'s turn`;
running = true;

function updateCell(cell,index) {
    options[index] = currentPlayer;
    cell.innerText = currentPlayer;
}
function resetBoard() {
    cells.forEach((cell) => (cell.innerText = " "));
  }
