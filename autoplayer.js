const getEmptyCells = () => Array.from(cells).filter(cell => !cell.textContent);

const findWinningMove = (player) => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const patternValues = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
    const emptyIndex = patternValues.indexOf('');
    if (emptyIndex > -1 && patternValues.filter(val => val === player).length === 2) {
      return pattern[emptyIndex];
    }
  }
  return -1;
};

const getCenterCell = () => (cells[4].textContent ? null : 4);

const getCornerCell = () => {
  const cornerIndices = [0, 2, 6, 8];
  const availableCorners = cornerIndices.filter(index => !cells[index].textContent);
  return availableCorners.length ? availableCorners[Math.floor(Math.random() * availableCorners.length)] : null;
};

const makeAutoMove = () => {
  const winningMove = findWinningMove('O');
  if (winningMove > -1) {
    makeMove(cells[winningMove]);
    return;
  }

  const blockingMove = findWinningMove('X');
  if (blockingMove > -1) {
    makeMove(cells[blockingMove]);
    return;
  }

  const centerCell = getCenterCell();
  if (centerCell !== null) {
    makeMove(cells[centerCell]);
    return;
  }

  const cornerCell = getCornerCell();
  if (cornerCell !== null) {
    makeMove(cells[cornerCell]);
    return;
  }

  const emptyCells = getEmptyCells();
  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    makeMove(emptyCells[randomIndex]);
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
      setTimeout(makeAutoMove, 500);
    }
  }
};
