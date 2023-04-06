const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

for (let cell of cells) {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('touchstart', handleTouch);
}

function handleClick(event) {
    event.stopPropagation();
    let cell = event.target;
    processTurn(cell);
}

function handleTouch(event) {
    event.preventDefault();
    let cell = event.target;
    processTurn(cell);
}

function processTurn(cell) {
    if (cell.textContent === EMPTY) {
        cell.textContent = currentPlayer;
        if (hasWon()) {
            alert('Player ' + currentPlayer + ' wins!');
            resetBoard();
        } else if (isBoardFull()) {
            alert("It's a draw!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
            updateTurnIndicator();
        }
    }
}

// The rest of the code remains the same...
