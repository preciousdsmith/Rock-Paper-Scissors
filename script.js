//player is allowed to chooses rock, paper or scissors
Start the game

ensure the scoreboard is visible on the gme
let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// pick 
updateScoreElement();

// this function determines winner
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    // the game results are determined on the player and computer's moves
    if (playerMove === 'rock') {
        result = (computerMove === 'rock') ? 'Tie.' :
                (computerMove === 'paper') ? 'You lose.' :
            'You win.';
    } else if (playerMove === 'paper') {
        result = (computerMove === 'rock') ? 'You win.' :
            (computerMove === 'paper') ? 'Tie.' :
            'You lose.';
    } else if (playerMove === 'scissors') {
        result = (computerMove === 'rock') ? 'You lose.' :
                (computerMove === 'paper') ? 'You win.' : 'Tie.';
    }
    // Update score based on the result
    if (result === 'You win.') score.wins++;
    else if (result === 'You lose.') score.losses++;
    else if (result === 'Tie.') score.ties++;
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"> <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
}

//function updates score
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function pickComputerMove() {
    const randomNumber = Math.random();
    return randomNumber < 1/3 ? 'rock' : (randomNumber < 2/3 ? 'paper' : 'scissors');
}

//function resets code
//score will reset to zero
function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
}
document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') playGame('rock');
    else if (event.key === 'p') playGame('paper');
    else if (event.key === 's') playGame('scissors');
});