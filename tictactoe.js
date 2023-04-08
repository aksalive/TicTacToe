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
  } else if (checkDraw()) {
    turnIndicator.textContent = "It's a draw!";
  }
}

function cellClicked(index) {
  if (gameEnded || board[index] !== "") return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;

  if (checkWin() || checkDraw()) {
    endGame();
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
    if (currentPlayer === "O") {
      makeBestMove();
    }
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    cellClicked(index);
  });
});

newGameButton.addEventListener("click", startNewGame);

function minimax(board, depth, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -1 : 1;
  }

  if (checkDraw()) {
    return 0;
  }

  const evaluateMoves = (move) => {
    const newBoard = [...board];
    newBoard[move] = isMaximizing ? "O" : "X";
    return minimax(newBoard, depth + 1, !isMaximizing);
  };

  const availableMoves = board.reduce(
    (acc, _, index) => (board[index] === "" ? [...acc, index] : acc),
    []
  );
  const scores = availableMoves.map(evaluateMoves);
  return isMaximizing
    ? Math.max(...scores) - depth
    : Math.min(...scores) + depth;
}

function findBestMove(board) {
  let bestMove  = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      const newBoard = [...board];
      newBoard[i] = 'O';
      const moveScore = minimax(newBoard, 0, false);

      if (moveScore > bestScore) {
        bestScore = moveScore;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function makeBestMove() {
  const bestMove = findBestMove(board);
  cellClicked(bestMove);
}

startNewGame();

