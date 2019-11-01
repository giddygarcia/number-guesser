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
	const playerDiff = Math.abs(targetGuess - playerGuess)
	const compDiff = Math.abs(targetGuess - computerGuess)
	return playerDiff <= compDiff;
}

const updateScore = (winner) => {
	if (winner === 'player')
		playerScore++;
	else if (winner === 'computer')
		computerScore++;
}

const newRound = () => {
	nextRoundBtn.setAttribute('disabled', true);
	guessBtn.removeAttribute('disabled');
	addButton.removeAttribute('disabled');

	targetNumDisplay.innerText = '?';
	computerGuessDisplay.innerText = '?';
	playerGuessInput.innerText = '0';
	computerWinsDisplay.innerText = '';
	guessBtn.innerText = 'Make This Guess';
	guessBtn.style.backgroundColor = '';
	guessBtn.style.color = '';
	guessBtn.style.fontWeight = '';
	count = 0;
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

let guessBtn = document.getElementById('guess-btn');
let nextRoundBtn = document.getElementById('next-btn');

guessBtn.addEventListener('click', () => {
	target = generateTarget();
	const computerGuess = generateCompGuess();

	computerGuessDisplay.innerText = computerGuess;
	targetNumDisplay.innerText = target;

	const playerIsWinner = compareGuesses(count, computerGuess, target)
	const winner = playerIsWinner ? 'player' : 'computer'

	updateScore(winner);

	if(playerIsWinner) {
		guessBtn.innerText = 'Congrats, You Win!';
		guessBtn.style.backgroundColor = "#39CCCC";
		guessBtn.style.color = "#01FF70";
		guessBtn.style.fontWeight = "900";
	} 
	else
		computerWinsDisplay.innerText = 'Computer Wins :|';

	playerScoreDisplay.innerText = playerScore;
	computerScoreDisplay.innerText = computerScore;

	subtractButton.setAttribute('disabled', true);
	addButton.setAttribute('disabled',true);
	guessBtn.setAttribute('disabled', true)
	nextRoundBtn.removeAttribute('disabled');
});

nextRoundBtn.addEventListener('click', () => {
	advanceRound();
	roundNumDisplay.innerText = currentRoundNumber;

	newRound();
});

const addButton = document.getElementById('add-btn');
const subtractButton = document.getElementById('sub-btn');
var count = 0;

addButton.addEventListener('click', () => {
	count++;
	playerGuessInput.innerText = count;
	handleNumLimits(count);
});

subtractButton.addEventListener('click', () => {
	count--;
	playerGuessInput.innerText = count;
	handleNumLimits(count);
});

const handleNumLimits = value => {
  if (value > 0 && value <= 9) {
    subtractButton.removeAttribute('disabled');
    addButton.removeAttribute('disabled');
  } 
  else if (value > 9)
    addButton.setAttribute('disabled', true);
  else if (value <= 0) {
    subtractButton.setAttribute('disabled', true);
  }
}

playerGuessInput.addEventListener('input', function(e) {
  handleNumLimits(e.target.value);
});