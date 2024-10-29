document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const guessBtn = document.getElementById('guessBtn');
    const resultDiv = document.getElementById('result');
    const restartBtn = document.getElementById('restartBtn');

    let randomNumber;
    let attempts;

    function startGame() {
        randomNumber = Math.floor(Math.random() * 100) + 1; 
        attempts = 0; 
        resultDiv.innerHTML = ''; 
        guessInput.value = ''; 
        guessInput.disabled = false; 
        guessBtn.disabled = false; 
        restartBtn.style.display = 'none'; 
        console.log('Náhodné číslo:', randomNumber); 
    }

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);
        attempts++;
        
        if (isNaN(userGuess)) {
            resultDiv.innerHTML = 'Please enter a valid number.';
            return;
        }

        if (userGuess < 1 || userGuess > 100) {
            resultDiv.innerHTML = 'The number must be between 1 and 100.';
            return;
        }

        if (userGuess === randomNumber) {
            resultDiv.innerHTML = `Congratulations! You guessed the number ${randomNumber} on the ${attempts}. try!`;
            endGame();
        } else if (userGuess < randomNumber) {
            resultDiv.innerHTML = 'Guessing is too low. Try again.';
        } else {
            resultDiv.innerHTML = 'The guesswork is too high. Try again.';
        }
    }

    function endGame() {
        guessInput.disabled = true;
        guessBtn.disabled = true;
        restartBtn.style.display = 'block';
    }

    guessBtn.addEventListener('click', checkGuess);
    restartBtn.addEventListener('click', startGame);

    startGame();
});
