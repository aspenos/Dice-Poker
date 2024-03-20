
let gameState = {
    playerScore: 0,
    computerScore: 0,
    currentPlayer: 'player' 
};


function initGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.currentPlayer = 'player';
    updateScores();
    document.getElementById('playerHand').textContent = 'Hand: None';
    document.getElementById('computerHand').textContent = 'Hand: None';
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('titlePage').style.display = 'block';
}

function checkForWin() {
    if (gameState.playerScore >= 100 || gameState.computerScore >= 100) {
        document.getElementById('gamePage').style.display = 'none';
        document.getElementById('resultPage').style.display = 'block';
        document.getElementById('resultMessage').textContent = gameState.playerScore >= 100 ? 'You win!' : 'You lost!';
    }
}


function updateScores() {
    document.getElementById('playerScore').textContent = 'Score: ' + gameState.playerScore;
    document.getElementById('computerScore').textContent = 'Score: ' + gameState.computerScore;
}


function playTurn(player) {
    let dice = rollDice();
    let hand = calculateHand(dice);
    gameState[player + 'Score'] += hand.score;

   
    document.getElementById(player + 'Score').textContent = 'Score: ' + gameState[player + 'Score'];
    document.getElementById(player + 'Hand').textContent = 'Hand: ' + hand.name;

    checkForWin();
}


document.getElementById('startButton').addEventListener('click', function() {
    initGame();
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
});

document.getElementById('rollButton').addEventListener('click', function() {
    if (gameState.currentPlayer === 'player') {
        playTurn('player');
        gameState.currentPlayer = 'computer';
        setTimeout(() => {
            playTurn('computer');
            gameState.currentPlayer = 'player';
        }, 1200); 
    }
});

document.getElementById('playAgainButton').addEventListener('click', initGame);

initGame();



