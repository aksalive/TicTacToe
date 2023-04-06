const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

let processing = false;

for (let cell of cells) {
    cell.addEventListener('click', handleClick);
    cell.addEventListener('touchend', handleClick);
}

function handleClick(event) {
    if (processing) return;
    processing = true;

    if (event.type === 'touchend') {
        event.preventDefault();
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

    setTimeout(() => {
        processing = false;
    }, 100);
}

// The rest of the code remains the same...
