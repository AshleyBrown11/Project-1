// Defining Game Parts
const cells = document.querySelectorAll(".cell");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const board = Array(cells.length);
board.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverGrid = document.getElementById("game-over-grid");
const gameOverText = document.getElementById("game-over-text");
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", resetBoard);

//Sounds
// const gameOverSound = new Audio("sounds/game_over.wav");
// const clickSound = new Audio("sounds/click.wav");

cells.forEach((cell) => cell.addEventListener("click", cellClick));

// Game Functions

function setHoverText() {
  //remove all hover text
  cells.forEach((cell) => {
    cell.classList.remove("x-hover");
    cell.classList.remove("o-hover");
  });

  const hoverClass = `${turn.toLowerCase()}-hover`;

  cells.forEach((cell) => {
    if (cell.innerText == "") {
      cell.classList.add(hoverClass);
    }
  });
}

setHoverText();

function cellClick(event) {
  if (gameOverGrid.classList.contains("visible")) {
    return;
  }

  const cell = event.target;
  const cellNumber = cell.dataset.index;
  if (cell.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    cell.innerText = PLAYER_X;
    board[cellNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    cell.innerText = PLAYER_O;
    board[cellNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

//   clickSound.play();
  setHoverText();
  checkWinner();
}

// function checkWinner() {
//   //Check for a winner
//   for (const winCombination of winCombinations) {
//     //Object Destructuring
//     const {combo} = winCombination;
//     const cellValue1 = board[combo[1]- 1];
//     const cellValue2 = board[combo[2] - 1];
//     const cellValue3 = board[combo[3] - 1];

//     if (
//       cellValue1 != null &&
//       cellValue1 === cellValue2 &&
//       cellValue1 === cellValue3
//     ) {
//       gameOver(cellValue1);
//       return;
//     }
//   }

  //Check for a draw
  const allCellFilledIn = board.every((cell => cell !== null));
  if (allCellFilledIn) {
    gameOver(null);
  }


function gameOver(winnerText) {
  let text = "Cat Game!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverGrid.className = "visible";
  gameOverText.innerText = text;
// gameOverSound.play();
}

function startGame() {
  gameOverGrid.className = "hidden";
  board.fill(null);
  cells.forEach((cell) => (cell.innerText = ""));
  turn = PLAYER_X;
  setHoverText();
}

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

function resetBoard() {
    cells.forEach((cell) => (cell.innerText = " "));
  }
