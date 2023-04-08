const cells = document.querySelectorAll(".cell");
const turnIndicator = document.querySelector(".turn-indicator");
const newGameButton = document.querySelector(".new-game");
const scoreboardX = document.getElementById("score-x");
const scoreboardO = document.getElementById("score-o");
let board;
let currentPlayer;
let gameEnded;

function startNewGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameEnded = false;
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    if (
      board[pattern[0]] &&
      board[pattern[0]] === board[pattern[1]] &&
      board[pattern[0]] === board[pattern[2]]
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function endGame() {
  gameEnded = true;

  if (checkWin()) {
    turnIndicator.textContent = `Player ${currentPlayer} wins!`;
    if (currentPlayer === "X") {
      scoreboardX.textContent = Number(scoreboardX.textContent) + 1;
    } else {
      scoreboardO.textContent = Number(scoreboardO.textContent) + 1;
    }
  } else {
    turnIndicator.textContent = "It's a draw!";
  }
}

function cellClicked(e) {
  const cellIndex = cells.indexOf(e.target);

  if (board[cellIndex] === "" && currentPlayer === "X") {
    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin() || checkDraw()) {
      endGame();
    } else {
      currentPlayer = "O";
      turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
      makeBestMove();
    }
  }
}


for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => cellClicked(i));
}

newGameButton.addEventListener("click", startNewGame);

function minimax(board, depth, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -1 : 1;
  }

  if (checkDraw()) {
    return 0;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      const newBoard = [...board];
      newBoard[i] = isMaximizing ? 'O' : 'X';
      const moveScore = minimax(newBoard, depth + 1, !isMaximizing);

      if (isMaximizing) {
        bestScore = Math.max(bestScore, moveScore);
      } else {
        bestScore = Math.min(bestScore, moveScore);
      }
    }
  }

  return bestScore;
}

function makeBestMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      const moveScore = minimax(board, 0, false);
      board[i] = "";
      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }

  board[bestMove] = "O";
  cells[bestMove].textContent = "O";
  if (checkWin() || checkDraw()) {
    endGame();
  } else {
    currentPlayer = "X";
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
  }
}

