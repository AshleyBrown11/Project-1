// Game Part Elements
const cells = Array.from(document.getElementsByClassName("cell"));
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", reset);
let gameOverText = document.getElementById("game-over-text");
const options = [null, null, null, null, null, null, null, null, null];

// Game Part Pieces
const o_text = "O";
const x_text = "X";
let currentPlayer = o_text;
let winCellIds = [];

//Sounds
const audio = new Audio("fairytale-game-over.wav");
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    audio.play();
  });
});
const audio2 = new Audio("arcade-click.wav");

// Game Functions- use forEach array function
function ClickEvent() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
  });
}

ClickEvent();
audio2.play();

function cellClick(e) {
  if (winCellIds.length > 0) {
    return;
  }
  const id = e.target.id;
  if (!options[id]) {
    options[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    if (checkWinner(currentPlayer)) {
      gameOverText.innerText = `${currentPlayer} has won!!`;
      gameOverText.style.background = " ";
      changeWinCellsBg();
      return;
    }
    currentPlayer = currentPlayer === o_text ? x_text : o_text;
  }
}

// Check for Winner-created a if conditional statement with win combinations to determine the winner. Thought I needed a loop to initialize, test condition, and add increment statement to change the loop control variable to determine the winner.
function checkWinner(cPlayer) {
  if (options[0] === cPlayer) {
    if (options[1] === cPlayer && options[2] === cPlayer) {
      winCellIds = [0, 1, 2];
      return true;
    }
    if (options[3] === cPlayer && options[6] === cPlayer) {
      winCellIds = [0, 3, 6];
      return true;
    }
    if (options[4] === cPlayer && options[8] === cPlayer) {
      winCellIds = [0, 4, 8];
      return true;
    }
  }
  if (options[4] === cPlayer) {
    if (options[1] === cPlayer && options[7] === cPlayer) {
      winCellIds = [4, 1, 7];
      return true;
    }
    if (options[2] === cPlayer && options[6] === cPlayer) {
      winCellIds = [4, 2, 6];
      return true;
    }
    if (options[3] === cPlayer && options[5] === cPlayer) {
      winCellIds = [4, 3, 5];
      return true;
    }
  }
  if (options[8] === cPlayer) {
    if (options[7] === cPlayer && options[6] === cPlayer) {
      winCellIds = [8, 7, 6];
      return true;
    }
    if (options[5] === cPlayer && options[2] === cPlayer) {
      winCellIds = [8, 5, 2];
      return true;
    }
  }
}

// Identify Winner by changing the cell style
function changeWinCellsBg() {
  winCellIds.forEach((id) => {
    cells[id].style.background = "white";
  });
  cells.forEach((cell) => {
    cell.style.cursor = "not-allowed";
  });
}

// Reset Game Function
function reset() {
  winCellIds = [];
  options.forEach((val, index) => {
    options[index] = null;
  });
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.style.background = "";
    cell.style.cursor = "pointer";
  });
  gameOverText.innerHTML = "Let's play..";
  gameOverText.style.background = "";
  currentPlayer = o_text;
}
