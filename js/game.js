let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let timer;
let seconds = 0;
let gameMode;

window.onload = function () {
    gameMode = localStorage.getItem('gameMode');
    const playerName1 = localStorage.getItem('playerName1');
    const playerName2 = localStorage.getItem('playerName2');
    
    if (gameMode === 'onePlayer') {
        document.getElementById('playerDisplay').innerText = `Jogador: ${playerName1}`;
    } else {
        document.getElementById('playerDisplay').innerText = `Jogador: ${currentPlayer === 'X' ? playerName1 : playerName2}`;
    }
    
    startTimer();
};

function makeMove(cell, index) {
    if (board[index] === '' && !isGameOver) {
        const playerName1 = localStorage.getItem('playerName1');
        const playerName2 = localStorage.getItem('playerName2');
        
        board[index] = currentPlayer;
        cell.innerText = currentPlayer;

        if (checkWinner()) {
            alert(`${currentPlayer === 'X' ? playerName1 : playerName2} venceu!`);
            isGameOver = true;
            clearInterval(timer);
        } else if (board.every(cell => cell !== '')) {
            alert('Empate!');
            isGameOver = true;
            clearInterval(timer);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'onePlayer' && currentPlayer === 'O') {
                setTimeout(makeMoveAI, 500);
            } else if (gameMode === 'twoPlayers') {
                const currentPlayerName = currentPlayer === 'X' ? localStorage.getItem('playerName1') : localStorage.getItem('playerName2');
                document.getElementById('playerDisplay').innerText = `Jogador: ${currentPlayerName}`;
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
        setTimeout(makeMoveAI, 500);
    }
}

function startTimer() {
    timer = setInterval(() => {
        seconds++;
        document.getElementById('timer').innerText = `Tempo: ${seconds}s`;
    }, 1000);
}

function goBack() {
    window.location.href = '/jogo-da-velha/index.html';
}