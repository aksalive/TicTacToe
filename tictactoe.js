// Add the following line below the line: const cells = board.getElementsByTagName('td');
const turnIndicator = document.getElementById('turn-indicator');

// Modify the handleClick function to update the turn indicator message
function handleClick(event) {
    event.preventDefault();
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

// Add the following function to update the turn indicator message
function updateTurnIndicator() {
    if (currentPlayer === PLAYER_ONE) {
        turnIndicator.textContent = "Player 1's turn (X)";
    } else {
        turnIndicator.textContent = "Player 2's turn (O)";
    }
}
