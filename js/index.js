let gameMode = '';

function setGameMode(mode) {
    gameMode = mode;
    localStorage.setItem('gameMode', mode);
    
    if (mode === 'onePlayer') {
        document.getElementById('singlePlayerFields').style.display = 'block';
        document.getElementById('twoPlayerFields').style.display = 'none';
    } else if (mode === 'twoPlayers') {
        document.getElementById('singlePlayerFields').style.display = 'none';
        document.getElementById('twoPlayerFields').style.display = 'block';
    }

    document.getElementById('startGameButton').style.display = 'block';
}

function startGame() {
    let playerNames;
    if (gameMode === 'onePlayer') {
        playerNames = [document.getElementById('playerName1').value.trim()];
        if (playerNames[0] === '') {
            alert('Por favor, digite o nome do jogador.');
            return;
        }
        localStorage.setItem('playerName1', playerNames[0]);
        localStorage.setItem('playerName2', 'Máquina');
    } else if (gameMode === 'twoPlayers') {
        playerNames = [
            document.getElementById('playerName1').value.trim(),
            document.getElementById('playerName2').value.trim()
        ];
        if (playerNames[0] === '' || playerNames[1] === '') {
            alert('Por favor, digite o nome de ambos os jogadores.');
            return;
        }
        localStorage.setItem('playerName1', playerNames[0]);
        localStorage.setItem('playerName2', playerNames[1]);
    }
    
    window.location.href = '/jogo-da-velha/html/game.html';
}