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

const computerMove = () => {
  if (!gameOver) {
    let cellIndex;
    do {
      cellIndex = Math.floor(Math.random() * 9);
    } while (cells[cellIndex].textContent);
    cells[cellIndex].textContent = 'O';
    moves++;
    currentPlayer = 'X';
    turnIndicator.textContent = `Player X's turn`;
    checkWinner();
  }
};

for (const cell of cells) {
  cell.addEventListener('click', (event) => {
    if (!event.target.textContent && !gameOver) {
      event.target.textContent = currentPlayer;
      moves++;
      checkWinner();

      if (!gameOver) {
        currentPlayer = 'O';
        turnIndicator.textContent = `Player O's turn`;
        setTimeout(computerMove, 500);
      }
    }
  });
}
