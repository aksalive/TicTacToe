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
    event.preventDefault();
    let cell = document.elementFromPoint(
        event.changedTouches[0].clientX,
        event.changedTouches[0].clientY
    );
    if (cell.tagName.toLowerCase() === 'td') {
        processTurn(cell);
    }
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
