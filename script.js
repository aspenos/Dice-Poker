
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
    document.getElementById('playerScore').textContent = 'Player Score: ' + gameState.playerScore;
    document.getElementById('computerScore').textContent = 'Computer Score: ' + gameState.computerScore;
}


function rollDice() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1).sort((a, b) => a - b);
}


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
        return { name: 'High Card', score: 0 }; 
    }
}


document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
});


document.getElementById('rollButton').addEventListener('click', function() {
    let dice = rollDice();
    let hand = calculateHand(dice);
    gameState[gameState.currentPlayer + 'Score'] += hand.score;
    updateScores();
    checkForWin();

    gameState.currentPlayer = gameState.currentPlayer === 'player' ? 'computer' : 'player';
});


document.getElementById('playAgainButton').addEventListener('click', initGame);


initGame();



function isFourOfAKind(dice) {
    
    dice.sort();
    
   
    return (dice[0] === dice[3]) || (dice[1] === dice[4]);
}


function isFullHouse(dice) {
    const counts = diceCounts(dice);
    return counts.includes(3) && counts.includes(2);
}


function isThreeOfAKind(dice) {
    const counts = diceCounts(dice);
    return counts.includes(3) && !counts.includes(2);
}

function isTwoPair(dice) {
    const counts = diceCounts(dice);
    return counts.filter(count => count === 2).length === 2;
}


function isOnePair(dice) {
    const counts = diceCounts(dice);
    return counts.includes(2) && counts.filter(count => count === 2).length === 1;
}


function isStraight(dice) {
   
    const straights = [[1,2,3,4,5], [2,3,4,5,6]];
    return straights.some(straight => straight.every((value, index) => value === dice[index]));
}


function isHighCard(dice) {
    const counts = diceCounts(dice);
    return counts.every(count => count === 1) && !isStraight(dice);
}

function diceCounts(dice) {
    const counts = new Array(6).fill(0); 
    dice.forEach(die => counts[die - 1]++);
    return counts;
}


