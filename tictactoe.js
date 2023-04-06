const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

const isTouchDevice = 'ontouchstart' in window;

for (let cell of cells) {
    if (isTouchDevice) {
        cell.addEventListener('touchend', handleTouch, { passive: false });
    } else {
        cell.addEventListener('click', handleClick);
    }
}

function handleClick(event) {
    event.stopPropagation();
    let cell = event.target;
    processTurn(cell);
}

function handleTouch(event) {
    event.stopPropagation();
    let cell = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    if (cell && cell.tagName.toLowerCase() === 'td') {
        processTurn(cell);
    }
    event.preventDefault();
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

function updateTurnIndicator() {
    turnIndicator.textContent = 'Player ' + currentPlayer + '\'s turn';
}

function resetBoard() {
    for (let cell of cells) {
        cell.textContent = EMPTY;
    }
    currentPlayer = PLAYER_ONE;
    updateTurnIndicator();
}

function hasWon() {
    // Check rows
    for (let i = 0; i < 9; i += 3) {
        if (cells[i].textContent === currentPlayer &&
            cells[i + 1].textContent === currentPlayer &&
            cells[i + 2].textContent === currentPlayer) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (cells[i].textContent === currentPlayer &&
            cells[i + 3].textContent === currentPlayer &&
            cells[i + 6].textContent === currentPlayer) {
            return true;
        }
    }

    // Check diagonals
    if (cells[0].textContent === currentPlayer &&
        cells[4].textContent === currentPlayer &&
        cells[8].textContent === currentPlayer) {
        return true;
    }

    if (cells[2].textContent === currentPlayer &&
        cells[4].textContent === currentPlayer &&
        cells[6].textContent === currentPlayer) {
        return true;
    }

    return false;
}

function isBoardFull() {
    for (let cell of cells) {
        if (cell.textContent === EMPTY) {
            return false;
        }
    }
    return true;
}
