// Define the initial state of the game
let gameState = {
    playerScore: 0,
    computerScore: 0,
    currentPlayer: 'player' // Indicates whose turn it is
};

// Initialize the game to its default state
function initGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.currentPlayer = 'player';
    updateScores();
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'none';
    document.getElementById('titlePage').style.display = 'block';
}

