const board = document.getElementById('game-board');
const cells = board.getElementsByClassName('cell');
const turnIndicator = document.getElementById('turn-indicator');

let currentPlayer = 'X';
let gameOver = false;
let moves = 0;

const checkWinner = () => {
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

const computerMove = () => {
  if (!gameOver && currentPlayer === 'O') {
    let cellIndex;
    do {
      cellIndex = Math.floor(Math.random() * 9);
    } while (cells[cellIndex].textContent);
    cells[cellIndex].textContent = currentPlayer;
    moves++;
    checkWinner();
    if (!gameOver) {
      switchPlayer();
    }
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
        setTimeout(computerMove, 500);
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
        setTimeout(computerMove, 500);
      }
    }
  });
}
