const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

for (let cell of cells) {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('touchstart', handleClick);
}

function handleClick(event) {
    if (event.type === 'touchstart') {
        event.preventDefault();
        event.stopPropagation();
    }

    let cell = event.target;
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

function hasWon() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let line of lines) {
        if (
            cells[line[0]].textContent !== EMPTY &&
            cells[line[0]].textContent === cells[line[1]].textContent &&
            cells[line[1]].textContent === cells[line[2]].textContent
        ) {
            return true;
        }
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

function resetBoard() {
    for (let cell of cells) {
        cell.textContent = EMPTY;
    }
    currentPlayer = PLAYER_ONE;
    updateTurnIndicator();
}

function updateTurnIndicator() {
    if (currentPlayer === PLAYER_ONE) {
        turnIndicator.textContent = "Player 1's turn (X)";
    } else {
        turnIndicator.textContent = "Player 2's turn (O)";
    }
}
