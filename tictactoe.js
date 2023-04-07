const board = document.getElementById('game-board');
const cells = board.getElementsByClassName('cell');
const turnIndicator = document.getElementById('turn-indicator');

let currentPlayer = 'X';
let gameOver = false;
let moves = 0;

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

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameOver = true;
      turnIndicator.textContent = `Player ${currentPlayer} wins!`;
      return;
    }
  }

  if (moves === 9) {
    gameOver = true;
    turnIndicator.textContent = "It's a draw!";
  }
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
};

const canPlayerWin = (player) => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      (cells[a].textContent === player && cells[b].textContent === player && !cells[c].textContent) ||
      (cells[a].textContent === player && cells[c].textContent === player && !cells[b].textContent) ||
      (cells[b].textContent === player && cells[c].textContent === player && !cells[a].textContent)
    ) {
      return pattern;
    }
  }
  return null;
};

const randomMove = () => {
  let cellIndex;
  do {
    cellIndex = Math.floor(Math.random() * 9);
  } while (cells[cellIndex].textContent);
  return cellIndex;
};

const smartComputerMove = () => {
  if (gameOver || currentPlayer !== 'O') return;

  let cellIndex;

  const winningMove = canPlayerWin('O');
  if (winningMove) {
    cellIndex = winningMove.find((i) => !cells[i].textContent);
  } else {
    const blockingMove = canPlayerWin('X');
    if (blockingMove) {
      cellIndex = blockingMove.find((i) => !cells[i].textContent);
    } else {
      cellIndex = randomMove();
    }
  }

  cells[cellIndex].textContent = currentPlayer;
  moves++;
  checkWinner();
  if (!gameOver) {
    switchPlayer();
  }
};

for (const cell of cells) {
  cell.addEventListener('click', (event) => {
    if (!event.target.textContent && !gameOver && currentPlayer === 'X') {
      event.target.textContent = currentPlayer;
      moves++;
      checkWinner();
      if (!gameOver) {
        switchPlayer();
        setTimeout(smartComputerMove, 500);
      }
    }
  });

  cell.addEventListener('touchend', (event) => {
    if (!event.target.textContent && !gameOver && currentPlayer === 'X') {
      event.target.textContent = currentPlayer;
      moves++;
      checkWinner();
      if (!gameOver) {
        switchPlayer();
        setTimeout(smartComputerMove, 500);
      }
    }
  });
}

  
