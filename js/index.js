function startGame(mode) {
    const playerName = document.getElementById('playerName').value;
    if (playerName.trim() !== '') {
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('gameMode', mode);
        window.location.href = '..jogo-da-velha/html/game.html';
    } else {
        alert('Por favor, digite seu nome.');
    }
}