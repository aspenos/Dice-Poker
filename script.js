

let gameState = {
    playerScore: 0,
    computerScore: 0,
    currentPlayer: 'player' 
};


function initGame() {
    gameState.playerScore = 0;
    gameState.computerScore = 0;
    gameState.currentPlayer = 'player';
    document.getElementById('playerScore').textContent = 'Score: 0';
    document.getElementById('computerScore').textContent = 'Score: 0';
    document.getElementById('playerHand').textContent = 'Hand: None';
    document.getElementById('computerHand').textContent = 'Hand: None';
    document.getElementById('titlePage').style.display = 'block';
    document.getElementById('gamePage').style.display = 'none';
    document.getElementById('resultPage').style.display = 'none';
}

document.getElementById('howToPlayButton').addEventListener('click', function() {
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('howToPlayPage').style.display = 'block';
});

document.getElementById('backButton').addEventListener('click', function() {
    document.getElementById('howToPlayPage').style.display = 'none';
    document.getElementById('titlePage').style.display = 'block';
});

document.getElementById('startButton').addEventListener('click', function() {
    initGame();
    document.getElementById('titlePage').style.display = 'none';
    document.getElementById('gamePage').style.display = 'block';
});

document.getElementById('rollButton').addEventListener('click', animateDice);

document.getElementById('playAgainButton').addEventListener('click', initGame);

function rollDice() {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
}

/////////////////////

document.getElementById('rollButton').addEventListener('click', animateDice);

function animateDice(player) {
    const diceImages = document.querySelectorAll('#diceContainer img');
    diceImages.forEach(die => die.classList.add('rolling'));

    setTimeout(() => {
        const diceValues = rollDice();
        diceValues.forEach((value, index) => {
            diceImages[index].src = `style/dice-six-faces-${value}.png`;
            diceImages[index].classList.remove('rolling');document.getElementById('rollButton').addEventListener('click', function() {
                if (gameState.currentPlayer === 'player') {
                    animateDice('player');
                }
            });
            
        });

        let hand = calculateHand(diceValues);
        gameState[player + 'Score'] += hand.score;
        updateScoreAndHand(player, gameState[player + 'Score'], hand.name);

        checkForWin();

        if (player === 'player') {
            gameState.currentPlayer = 'computer';
            // Delay computer's turn if the game is not over
            setTimeout(() => {
                if (!gameState.gameOver) {
                    animateDice('computer');
                }
            }, 5000); // Delay before computer's turn
        } else {
            gameState.currentPlayer = 'player';
        }
    }, 2000); // Dice roll animation time
}

function updateScoreAndHand(player, score, hand) {
    document.getElementById(player + 'Score').textContent = 'Score: ' + score;
    document.getElementById(player + 'Hand').textContent = 'Hand: ' + hand;
}


document.getElementById('rollButton').addEventListener('click', function() {
    if (gameState.currentPlayer === 'player') {
        animateDice('player');
    }
});


/////////////////////////

function checkForWin() {
    if (gameState.playerScore >= 100 || gameState.computerScore >= 100) {
        document.getElementById('gamePage').style.display = 'none';
        document.getElementById('resultPage').style.display = 'block';
        document.getElementById('resultMessage').textContent = gameState.playerScore >= 100 ? 'You win!' : 'You lost!';
    }
}

function calculateHand(dice) {
    dice.sort((a, b) => a - b); 
    return evaluateHand(dice);
}

function evaluateHand(dice) {
    if (isStraight(dice)) {
        return { name: 'Straight', score: 80 };
    } else if (isFiveOfAKind(dice)) {
        return { name: 'Five of a Kind', score: 40 };
    } else if (isFullHouse(dice)) {
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

function getDiceCounts(dice) {
    const counts = {};
    dice.forEach(die => {
        counts[die] = (counts[die] || 0) + 1;
    });
    return Object.values(counts);
}


function isStraight(dice) {
    for (let i = 0; i < dice.length - 1; i++) {
        if (dice[i + 1] - dice[i] !== 1) {
            return false;
        }
    }
    return true;
}

function isFiveOfAKind(dice) {
    return new Set(dice).size === 1;
}

function isFullHouse(dice) {
    const counts = getDiceCounts(dice);
    return counts[0] === 3 && counts[1] === 2;
}

function isFourOfAKind(dice) {
    const counts = getDiceCounts(dice);
    return counts.includes(4);
}

function isThreeOfAKind(dice) {
    const counts = getDiceCounts(dice);
    return counts.includes(3) && !counts.includes(2);
}

function isTwoPair(dice) {
    const counts = getDiceCounts(dice);
    return counts.filter(count => count === 2).length === 2;
}

function isOnePair(dice) {
    const counts = getDiceCounts(dice);
    return counts.includes(2);
}

function isHighCard(dice) {
    return !isOnePair(dice) && !isTwoPair(dice) && !isThreeOfAKind(dice) &&
           !isStraight(dice) && !isFullHouse(dice) && !isFourOfAKind(dice) && !isFiveOfAKind(dice);
}


function getDiceCounts(dice) {
    const counts = {};
    dice.forEach(die => {
        counts[die] = (counts[die] || 0) + 1;
    });
    return Object.values(counts);
}


document.getElementById('rollButton').addEventListener('click', function() {
    if (gameState.currentPlayer === 'player') {
        playTurn('player');
        gameState.currentPlayer = 'computer';
    } else {
        playTurn('computer');
        gameState.currentPlayer = 'player';
    }
});

function playTurn(player) {
    let dice = rollDice();
    console.log("Dice roll result:", dice);
    let hand = calculateHand(dice);
    console.log("Evaluated hand:", hand.name);

    gameState[player + 'Score'] += hand.score;
    document.getElementById(player + 'Score').textContent = 'Score: ' + gameState[player + 'Score'];
    document.getElementById(player + 'Hand').textContent = hand.name;

    checkForWin();

    gameState.currentPlayer = gameState.currentPlayer === 'player' ? 'computer' : 'player';

    console.log("Rolled Dice:", diceValues);
    return diceValues;
}


document.getElementById('playAgainButton').addEventListener('click', initGame);

initGame();
