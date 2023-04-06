const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

const isTouchDevice = 'ontouchstart' in window;
const touchThreshold = 10; // Adjust this value to change the sensitivity of the hysteresis
let touchStartX = 0;
let touchStartY = 0;

for (let cell of cells) {
    if (isTouchDevice) {
        cell.addEventListener('touchstart', (event) => {
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        });
        cell.addEventListener('touchend', handleTouch);
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
    let touchEndX = event.changedTouches[0].clientX;
    let touchEndY = event.changedTouches[0].clientY;

    if (Math.abs(touchEndX - touchStartX) <= touchThreshold && Math.abs(touchEndY - touchStartY) <= touchThreshold) {
        let cell = event.target;
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
