*Project Choice*

Dice Poker

*Project Description*

My app is called Dice Poker. In the game, the user faces off against a computer, each taking turns rolling five 6-sided dice. The goal is to match classic poker hands with the dice to score points. Each number combination equates to a poker hand, such as a straight, full house, high card, etc. The poker hands are assigned points based on their rarity. Both sides continue taking turns rolling their dice until one player reaches 100 points, winning the game. 

*Wire Frames*

Initial Landing View

https://www.canva.com/design/DAF_1ZLh6Z0/6EQ6k5tuqgV7kYNDlUpFGA/edit

Results View

https://www.canva.com/design/DAF_1ZLh6Z0/6EQ6k5tuqgV7kYNDlUpFGA/edit

*User Stories*

MVP Goals

As a player, I want to be informed when the game is over due to a win, tie, or loss. 
As a player, I want a "how to play" reference page that teaches me the rules of the game. 
As a player, I want to receive points whenever I "win", and have both scores update accordingly. 
As a player, I want an aesthetic user interface that shows dice results, current score, the poker hand name, and a prompt for the player to roll the dice. 
As a player who requires assistive technologies, I would like accessibility features such as a tutorial, high color contrast, and visual indicators, so I can enjoy the game fully. 

Stretch Goals 

As a player, I want an animated dice roll to further immerse myself into the game. 
As a player, I want the ability to customize dice to add personalization to my experience. 
As a player who requires assistive technologies, I would like audio indicators when I win, lose, or tie. 
As a player, I want the ability to customize the background wallpaper, adding immersion.
As a player, I want the ability to listen to music inside the game, adding immersion. 
As a player, I want the ability to play online against my friends. 

*Pseudocode*

Initialize game variables
  Set player score to 0
  Set computer score to 0
  Set target score to 100

Display Title Page

While player score < target score and computer score < target score
  If it's the player's turn
    Display Game Page
    Player rolls dice
    Calculate player's hand and score
    Update player score
    Display player's hand and updated score
    Switch to computer's turn

  If it's the computer's turn
    Computer rolls dice
    Calculate computer's hand and score
    Update computer score
    Display computer's hand and updated score
    Switch to player's turn

  Check if player or computer reached the target score
    If yes, end loop

Display Result Page
  If player score >= target score
    Display "Player Wins"
  Else if computer score >= target score
    Display "Computer Wins"
  Else
    Display "It's a tie"

Ask player if they want to play again
  If yes, restart the game
  If no, exit game

*Timeline*

| Day       | Task                                                                    | Status |
|-----------|-------------------------------------------------------------------------|--------|
| Monday    | Outline structure. Plan core functionalities.                           |        |
| Tuesday   | Implement dice rolling function.                                        |        |
| Wednesday | Deployment Development logic to calculate and display poker hands.      |        |
| Thursday  | Create scoring system. Design simple UI showing dice, score, & status.  |        |
| Friday    | Testing and debugging. Start working on stretch goals if appropriate.   |        |
| Saturday  | Finalize remaining features. Conduct complete game test. Polish UI      |        |
| Sunday    | Finalize remaining features. Conduct game tests. Polish UI.             |        |
| Monday    | Present                                                                 |        |