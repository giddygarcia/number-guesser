let playerScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

const generateTarget = () => {
	return Math.floor(Math.random() * 10);
}

const generateCompGuess = () => {
	return Math.floor(Math.random() * 10);
}

const compareGuesses = (playerGuess, computerGuess, targetGuess) => {
	const playerDiff = Math.abs(playerGuess - targetGuess)
	const compDiff = Math.abs(computerGuess - targetGuess)
	return playerDiff <= compDiff;
}

const updateScore = (winner) => {
	if  (winner === 'player') {
		playerScore++;
	}
	else if (winner === 'computer')
		computerScore++;
}

const advanceRound = () => currentRoundNumber++;

let target; 
let computerScoreDisplay = document.getElementById('computer-score');
let computerGuessDisplay = document.getElementById('computer-guess');
let computerWinsDisplay = document.getElementById('computer-wins');

let roundNumDisplay = document.getElementById('round-number');
let targetNumDisplay = document.getElementById('target-number');

let playerScoreDisplay = document.getElementById('player-score');
let playerGuessInput = document.getElementById('player-guess');

let guessButton = document.getElementById('btn-guess');
let nextRoundButton = document.getElementById('btn-next');


guessButton.addEventListener('click', () => {
	target = generateTarget();
	const currentPlayerGuess = playerGuessInput.value;
	const computerGuess = generateCompGuess();

	computerGuessDisplay.innerText = computerGuess;
	targetNumDisplay.innerText = target;

	const playerIsWinner = compareGuesses(currentplayerGuess, computerGuess, target)
	const winner = playerIsWinner ? 'player' : 'computer'

	updateScore(winner);

	if(playerIsWinner) {
		guessButton.innerText = 'Congrats, You Win!';
	}
	else
		computerWinsDisplay.innerText = 'Computer Wins :|';

	playerScoreDisplay.innerText = playerScore;
	computerScoreDisplay.innerText = computerScore;

	guessButton.setAttribute('disabled', true)
	nextRoundButton.removeAttribute('disabled');
});