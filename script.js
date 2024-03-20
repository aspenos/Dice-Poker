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

// Check if any player has reached the win condition
function checkForWin() {
    if (gameState.playerScore >= 100 || gameState.computerScore >= 100) {
        document.getElementById('gamePage').style.display = 'none';
        document.getElementById('resultPage').style.display = 'block';
        document.getElementById('resultMessage').textContent = gameState.playerScore >= 100 ? 'You win!' : 'You lost!';
    }
}

// Update the scores on the UI
function updateScores() {
    document.getElementById('playerScore').textContent = 'Player Score: ' + gameState.playerScore;
    document.getElementById('computerScore').textContent = 'Computer Score: ' + gameState.computerScore;
}

// Roll the dice and determine the outcome
function rollDice() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
}

// Calculate the score based on the rolled dice
function calculateHand(dice) {
    if (isFullHouse(dice)) {
        return { name: 'Full House', score: 24 };
    } else if (isFourOfAKind(dice)) {
        return { name: 'Four of a Kind', score: 18 };
    } else if (isThreeOfAKind(dice)) {
        return { name: 'Three of a Kind', score: 8 };
    } else if (isTwoPair(dice)) {
        return { name: 'Two Pair', score: 5 };
    } else if (isOnePair(dice)) {
        return { name: 'One Pair', score: 2 };
    } else {
        return { name: 'High Card', score: 0 }; // Assuming High Card is the lowest rank
    }
}

// Define the helper functions to evaluate each hand
// ... (implement the logic for these functions based on the poker hand rules)

// Event listener for the 'Start Game' button
document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
});

// Event listener for the 'Roll Dice' button
document.getElementById('rollButton').addEventListener('click', function() {
    let dice = rollDice();
    let hand = calculateHand(dice);
    gameState[gameState.currentPlayer + 'Score'] += hand.score;
    updateScores();
    checkForWin();
    // Switch turns
    gameState.currentPlayer = gameState.currentPlayer === 'player' ? 'computer' : 'player';
});

// Event listener for the 'Play Again' button
document.getElementById('playAgainButton').addEventListener('click', initGame);

// Call initGame on page load to reset the game to its initial state
initGame();

///ADD THIS IN REPLACE CHECK CHAT

function isFourOfAKind(dice) {
    // Sort the dice to ensure they are in order
    dice.sort();
    
    // Check if the first four are the same, or the last four are the same
    return (dice[0] === dice[3]) || (dice[1] === dice[4]);
}

// Checks if there's a "Full House": three of a kind + a pair
function isFullHouse(dice) {
    const counts = diceCounts(dice);
    return counts.includes(3) && counts.includes(2);
}

// Checks if there's a "Three of a Kind" (not part of a full house or four of a kind)
function isThreeOfAKind(dice) {
    const counts = diceCounts(dice);
    return counts.includes(3) && !counts.includes(2);
}

// Checks if there's a "Two Pair"
function isTwoPair(dice) {
    const counts = diceCounts(dice);
    return counts.filter(count => count === 2).length === 2;
}

// Checks if there's a "One Pair" (not part of two pairs, a full house, or four of a kind)
function isOnePair(dice) {
    const counts = diceCounts(dice);
    return counts.includes(2) && counts.filter(count => count === 2).length === 1;
}

// Checks if there's a "Straight"
function isStraight(dice) {
    // Since dice are sorted, a straight can only be [1,2,3,4,5] or [2,3,4,5,6]
    const straights = [[1,2,3,4,5], [2,3,4,5,6]];
    return straights.some(straight => straight.every((value, index) => value === dice[index]));
}

// Checks if there's a "High Card" (no pairs, three-of-a-kinds, or straights)
function isHighCard(dice) {
    const counts = diceCounts(dice);
    return counts.every(count => count === 1) && !isStraight(dice);
}

// Helper function to count the occurrences of each die
function diceCounts(dice) {
    const counts = new Array(6).fill(0); // One slot for each possible die face
    dice.forEach(die => counts[die - 1]++);
    return counts;
}


