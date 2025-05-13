document.addEventListener('DOMContentLoaded', () => {
    const bowlButton = document.getElementById('bowlButton');
    const resultImage = document.getElementById('resultImage');
    const player1RunsDisplay = document.getElementById('player1Runs');
    const player1WicketsDisplay = document.getElementById('player1Wickets');
    const player2RunsDisplay = document.getElementById('player2Runs');
    const player2WicketsDisplay = document.getElementById('player2Wickets');
    const extrasScoreDisplay = document.getElementById('extrasScore');

    const outcomes = [
        'images/out.png',
        'images/1run.png',
        'images/2run.png',
        'images/3run.png',
        'images/4run.png',
        'images/6run.png',
        'images/noball.png',
        'images/wideball.png'
    ];

    let player1Runs = 0;
    let player1Wickets = 0;
    let player2Runs = 0;
    let player2Wickets = 0;
    let extras = 0;
    let currentPlayer = 1; // Start with Player 1
    let wicketsRemaining = 10; // Standard cricket
    let totalBalls = 6; // Overs can be simplified

    bowlButton.addEventListener('click', () => {
        if ((currentPlayer === 1 && player1Wickets < wicketsRemaining) || (currentPlayer === 2 && player2Wickets < wicketsRemaining)) {
            const randomIndex = Math.floor(Math.random() * outcomes.length);
            const outcome = outcomes[randomIndex];
            resultImage.src = outcome;

            if (currentPlayer === 1) {
                if (outcome.includes('out')) {
                    player1Wickets++;
                } else if (outcome.includes('run')) {
                    player1Runs += parseInt(outcome.charAt(0));
                } else if (outcome.includes('noball') || outcome.includes('wideball')) {
                    player1Runs++;
                    extras++;
                }
                player1RunsDisplay.textContent = player1Runs;
                player1WicketsDisplay.textContent = player1Wickets;
            } else {
                if (outcome.includes('out')) {
                    player2Wickets++;
                } else if (outcome.includes('run')) {
                    player2Runs += parseInt(outcome.charAt(0));
                } else if (outcome.includes('noball') || outcome.includes('wideball')) {
                    player2Runs++;
                    extras++;
                }
                player2RunsDisplay.textContent = player2Runs;
                player2WicketsDisplay.textContent = player2Wickets;
            }

            extrasScoreDisplay.textContent = extras;

            // Basic innings change logic (can be made more sophisticated)
            if ((currentPlayer === 1 && player1Wickets === wicketsRemaining) || (currentPlayer === 1 && totalBalls === 0)) {
                currentPlayer = 2;
                totalBalls = 6; // Reset balls for the next innings
                alert("Player 1's innings over. Player 2 to bat!");
            } else if ((currentPlayer === 2 && player2Wickets === wicketsRemaining) || (currentPlayer === 2 && totalBalls === 0)) {
                // Game over logic
                if (player1Runs > player2Runs) {
                    alert(`Player 1 wins by ${player1Runs - player2Runs} runs!`);
                } else if (player2Runs > player1Runs) {
                    alert(`Player 2 wins by ${player2Runs - player1Runs} runs!`);
                } else {
                    alert("It's a tie!");
                }
                // Optionally reset the game here
            } else {
                totalBalls--;
            }
        } else if (currentPlayer === 1) {
            alert("Player 1 is all out!");
            currentPlayer = 2;
            totalBalls = 6;
        } else {
            alert("Player 2 is all out! Game Over!");
            // Display result again if not already shown
            if (player1Runs > player2Runs) {
                alert(`Player 1 wins by ${player1Runs - player2Runs} runs!`);
            } else if (player2Runs > player1Runs) {
                alert(`Player 2 wins by ${player2Runs - player1Runs} runs!`);
            } else {
                alert("It's a tie!");
            }
        }
    });
});