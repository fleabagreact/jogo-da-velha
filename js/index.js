let gameMode = '';

function setGameMode(mode) {
    gameMode = mode;
    localStorage.setItem('gameMode', mode);

    document.getElementById('fieldsContainer').classList.remove('hidden');

    if (mode === 'onePlayer') {
        document.getElementById('singlePlayerFields').classList.remove('hidden');
        document.getElementById('twoPlayerFields').classList.add('hidden');
    } else if (mode === 'twoPlayers') {
        document.getElementById('singlePlayerFields').classList.add('hidden');
        document.getElementById('twoPlayerFields').classList.remove('hidden');
    }
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