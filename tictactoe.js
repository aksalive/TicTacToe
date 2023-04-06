const PLAYER_ONE = 'X';
const PLAYER_TWO = 'O';
const EMPTY = '';
let currentPlayer = PLAYER_ONE;

const board = document.getElementById('game-board');
const cells = board.getElementsByTagName('td');

for (let cell of cells) {
    cell.addEventListener('click', function () {
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
            }
        }
    });
}

function hasWon() {
    for (let i = 0; i < 3; i++) {
        if (checkRow(i) || checkColumn(i)) return true;
    }
    return checkDiagonals();
}

function checkRow(row) {
    let symbol = cells[row * 3].textContent;
    return symbol !== EMPTY && cells[row * 3 + 1].textContent === symbol && cells[row * 3 + 2].textContent === symbol;
}

function checkColumn(col) {
    let symbol = cells[col].textContent;
    return symbol !== EMPTY && cells[col + 3].textContent === symbol && cells[col + 6].textContent === symbol;
}

function checkDiagonals() {
    let center = cells[4].textContent;
    if (center === EMPTY) return false;

    if (cells[0].textContent === center && cells[8].textContent === center) return true;
    if (cells[2].textContent === center && cells[6].textContent === center) return true;

    return false;
}

function isBoardFull() {
    for (let cell of cells) {
        if (cell.textContent === EMPTY) return false
