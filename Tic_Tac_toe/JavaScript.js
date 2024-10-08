const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove("x", "o");
        cell.textContent = "";
        cell.addEventListener("click", handleClick, { once: true });
    });
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    board = ["", "", "", "", "", "", "", "", ""];
}

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);
    placeMark(cell, cellIndex);
    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, index) {
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;
}

function swapTurns() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function isDraw() {
    return board.every(cell => cell === "X" || cell === "O");
}

function endGame(draw) {
    if (draw) {
        statusText.textContent = "It's a Draw!";
    } else {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener("click", handleClick));
}

restartBtn.addEventListener("click", startGame);

startGame();
