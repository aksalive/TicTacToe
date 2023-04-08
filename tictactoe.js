const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turn-indicator');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let moves = 0;
let gameOver = false;

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

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
};

const updateScoreboard = () => {
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  scoreX.textContent = wins['X'];
  scoreO.textContent = wins['O'];
};

const wins = { X: 0, O: 0 };
updateScoreboard();

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      wins[currentPlayer]++;
      updateScoreboard();
      gameOver = true;
      alert(`Player ${currentPlayer} wins!`);
      break;
    }
  }

  if (!gameOver && moves === 9) {
    gameOver = true;
    alert("It's a draw!");
  }
};

const makeMove = (cell) => {
  if (gameOver || cell.textContent) {
    return;
  }

  cell.textContent = currentPlayer;
  moves++;

  checkWinner();

  if (!gameOver) {
    switchPlayer();
    if (currentPlayer === 'O') {
      makeAutoMove();
    }
  }
};

const makeAutoMove = () => {
  let emptyCells = Array.from(cells).filter(cell => !cell.textContent);
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
  }
};

cells.forEach((cell) => {
  cell.addEventListener('click', (event) => {
    if (currentPlayer === 'X') {
      makeMove(event.target);
    }
  });
});

const resetGame = () => {
  cells.forEach((cell) => {
    cell.textContent = '';
  });

  currentPlayer = 'X';
  moves = 0;
  gameOver = false;

  turnIndicator.textContent = `Player ${currentPlayer}'s turn`;
};

newGameButton.addEventListener('click', resetGame);

