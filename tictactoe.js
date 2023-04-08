const cells = Array.from(document.querySelectorAll(".cell")), turnIndicator = document.querySelector(".turn-indicator"), newGameButton = document.querySelector(".new-game"), scoreXElement = document.getElementById("score-x"), scoreOElement = document.getElementById("score-o");
let board = ["", "", "", "", "", "", "", "", ""], currentPlayer = "X", gameOver = false, scoreX = 0, scoreO = 0;
cells.forEach((cell) => cell.addEventListener("click", cellClicked)); newGameButton.addEventListener("click", newGame);
function cellClicked(e) { const cellIndex = cells.indexOf(e.target); if (board[cellIndex] === "" && currentPlayer === "X") { board[cellIndex] = currentPlayer; e.target.textContent = currentPlayer; if (checkWin() || checkDraw()) { endGame(); } else { currentPlayer = "O"; turnIndicator.textContent = `Player ${currentPlayer}'s turn`; makeBestMove(); } } }
function newGame() { board = ["", "", "", "", "", "", "", "", ""]; cells.forEach((cell) => (cell.textContent = "")); currentPlayer = "X"; gameOver = false; turnIndicator.textContent = `Player ${currentPlayer}'s turn`; }
function endGame() { if (checkWin()) { currentPlayer === "X" ? (scoreX++, scoreXElement.textContent = scoreX) : (scoreO++, scoreOElement.textContent = scoreO); alert(`Player ${currentPlayer} wins!`); } else if (checkDraw()) { alert("It's a draw!"); } gameOver = true; currentPlayer = "X"; }
function checkWin() { const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; for (const pattern of winPatterns) { if (board[pattern[0]] === currentPlayer && board[pattern[1]] === currentPlayer && board[pattern[2]] === currentPlayer) { return true; } } return false; }
function checkDraw() { return board.every((cell) => cell !== ""); }
function makeBestMove() { let bestScore = -Infinity, bestMove; for (let i = 0; i < board.length; i++) { if (board[i] === "") { board[i] = "O"; const moveScore = minimax(board, 0, false); board[i] = ""; if (moveScore > bestScore) { bestScore = moveScore; bestMove = i; } } } board[bestMove] = "O"; cells[bestMove].textContent = "O"; if (checkWin() || checkDraw()) { endGame(); } else { currentPlayer = "X"; turnIndicator.textContent = `Player ${currentPlayer}'s turn`; } }
function minimax(board, depth, maximizingPlayer) { if (checkWin()) { return currentPlayer === "O" ? 10 - depth : depth - 10; } if (checkDraw()) { return 0; } if (maximizingPlayer) { let bestScore = -Infinity; for (let i = 0; i < board.length; i++) { if (board[i] === "") { board[i] = "O"; const score = minimax(board, depth + 1, false); board[i] = ""; bestScore = Math.max(score, bestScore); } } return bestScore; } else { let bestScore = Infinity;
for (let i = 0; i < board.length; i++) {
if (board[i] === "") {
board[i] = "X";
const score = minimax(board, depth + 1, true);
board[i] = "";
bestScore = Math.min(score, bestScore);
}
}
return bestScore;
}
}
