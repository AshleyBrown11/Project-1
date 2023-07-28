const cells = Array.from(document.getElementsByClassName("cell"));
const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", reset);
let gameOverText = document.getElementById("game-over-text");
const areas = [null, null, null, null, null, null, null, null, null];
const o_text = "O";
const x_text = "X";
let currentPlayer = o_text;
let winCellIds = [];

function ClickEvent() {
  cells.forEach((cell) => {
    cell.addEventListener("click", cellClick);
  });
}

ClickEvent();

function cellClick(e) {
  if (winCellIds.length > 0) {
    return;
  }
  const id = e.target.id;
  if (!areas[id]) {
    areas[id] = currentPlayer;
    e.target.innerHTML = currentPlayer;

    if (hasPlayerWon(currentPlayer)) {
      gameOverText.innerText = `${currentPlayer} has won!!`;
      gameOverText.style.background = "white";
      changeWinCellsBg();
      return;
    }
    currentPlayer = currentPlayer === o_text ? x_text : o_text;
  }
}

function hasPlayerWon(cPlayer) {
  if (areas[0] === cPlayer) {
    if (areas[1] === cPlayer && areas[2] === cPlayer) {
      winCellIds = [0, 1, 2];
      return true;
    }
    if (areas[3] === cPlayer && areas[6] === cPlayer) {
      winCellIds = [0, 3, 6];
      return true;
    }
    if (areas[4] === cPlayer && areas[8] === cPlayer) {
      winCellIds = [0, 4, 8];
      return true;
    }
  }
  if (areas[4] === cPlayer) {
    if (areas[1] === cPlayer && areas[7] === cPlayer) {
      winCellIds = [4, 1, 7];
      return true;
    }
    if (areas[2] === cPlayer && areas[6] === cPlayer) {
      winCellIds = [4, 2, 6];
      return true;
    }
    if (areas[3] === cPlayer && areas[5] === cPlayer) {
      winCellIds = [4, 3, 5];
      return true;
    }
  }
  if (areas[8] === cPlayer) {
    if (areas[7] === cPlayer && areas[6] === cPlayer) {
      winCellIds = [8, 7, 6];
      return true;
    }
    if (areas[5] === cPlayer && areas[2] === cPlayer) {
      winCellIds = [8, 5, 2];
      return true;
    }
  }
}

function changeWinCellsBg() {
  winCellIds.forEach((id) => {
    cells[id].style.background = "white";
  });
  cells.forEach((cell) => {
    cell.style.cursor = "not-allowed";
  });
}

function reset() {
  winCellIds = [];
  areas.forEach((val, index) => {
    areas[index] = null;
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
