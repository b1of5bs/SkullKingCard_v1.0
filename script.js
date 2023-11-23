document.getElementById('playerCountForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the number of players
    const playerCount = parseInt(document.getElementById('playerCount').value);
    
    // Hide the form
    this.style.display = 'none';

    // Generate the score table
    generateScoreTable(playerCount);
});

function generateScoreTable(playerCount) {
    const container = document.querySelector('.container');

    // Create the table
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    // Generate rows for player names
    const nameRow = document.createElement('tr');
    for (let i = 0; i < playerCount; i++) {
        const nameCell = document.createElement('td');
        nameCell.classList.add('player-name-cell');
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = `Player ${i+1} Name`;
        nameCell.appendChild(nameInput);
        nameRow.appendChild(nameCell);
    }
    tbody.appendChild(nameRow);

    // Generate rows for scores
    for (let round = 0; round < 10; round++) {
        const row = document.createElement('tr');
        for (let i = 0; i < playerCount; i++) {
            const cell = document.createElement('td');
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Round ${round+1}`;
            input.step = '10'
            cell.appendChild(input);
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.appendChild(table);

    // Create the Finish Game button
    const finishButton = document.createElement('button');
    finishButton.textContent = 'Finish the Game';
    finishButton.addEventListener('click', calculateWinner);
    container.appendChild(finishButton);
}

function calculateWinner() {
    const table = document.querySelector('table');
    const playerScores = [];
    let maxScore = 0;
    let winner = null;

    // Calculate scores for each player
    for (let row = 1; row < table.rows.length; row++) {
        for (let col = 0; col < table.rows[row].cells.length; col++) {
            const scoreInput = table.rows[row].cells[col].querySelector('input');
            const score = parseInt(scoreInput.value) || 0;

            if (row === 1) {
                // Initialize playerScores array for the first row of scores
                playerScores[col] = score;
            } else {
                // Add the score to the existing total for each player
                playerScores[col] += score;
            }
        }
    }

    // Find the player with the highest score
    playerScores.forEach((score, index) => {
        if (score > maxScore) {
            maxScore = score;
            winner = table.rows[0].cells[index].querySelector('input').value || `Player ${index + 1}`;
        }
    });

    // Display the winner
    alert(`${winner} wins with a total score of ${maxScore}!`);

    // Hide the Finish the Game button
    const finishButton = document.getElementById('finish-game-button');
    if (finishButton) {
        finishButton.style.display = 'none';
    }

    // Create and show the Play Again button
    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.id = 'play-again-button';
    playAgainButton.addEventListener('click', resetGame);
    document.querySelector('.container').appendChild(playAgainButton);
}

// Ensure to have a resetGame function defined to reset the game state
function resetGame() {
    // Logic to reset the game
    // For simplicity, you can use window.location.reload() to refresh the page
    window.location.reload();
}
