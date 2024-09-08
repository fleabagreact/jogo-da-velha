let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let timer;
let seconds = 0;
let gameMode;

window.onload = function () {
    document.getElementById('playerDisplay').innerText = `Jogador: ${localStorage.getItem('playerName')}`;
    gameMode = localStorage.getItem('gameMode');
    startTimer();
};

function makeMove(cell, index) {
    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} venceu!`);
            isGameOver = true;
            clearInterval(timer);
        } else if (board.every(cell => cell !== '')) {
            alert('Empate!');
            isGameOver = true;
            clearInterval(timer);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'onePlayer' && currentPlayer === 'O') {
                setTimeout(makeMoveAI, 500); // Jogada da IA após 500ms
            }
        }
    }
}

function makeMoveAI() {
    let availableCells = board
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
    
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        let cell = document.querySelectorAll('.cell')[randomIndex];
        makeMove(cell, randomIndex);
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    document.querySelectorAll('.cell').forEach(cell => (cell.innerText = ''));
    clearInterval(timer);
    seconds = 0;
    startTimer();
    if (gameMode === 'onePlayer' && currentPlayer === 'O') {
        setTimeout(makeMoveAI, 500); // IA começa se for sua vez
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = `Tempo: ${seconds}s`;
    }, 1000);
}

function goBack() {
    window.location.href = 'index.html';
}