function addNewBet() {
    const today = new Date().toLocaleDateString('ru-RU'); // Get current date in DD.MM.YYYY format

    rightPanel.innerHTML = `
        <div class="add-bet-form">
            <h2>Add New Bet</h2>
            <form id="newBetForm">
                <div class="form-group">
                    <label for="discipline">Discipline:</label>
                    <select id="discipline" name="discipline" required>
                        <option value="Dota">Dota</option>
                        <option value="CS">CS</option>
                        <option value="Valorant">Valorant</option>
                        <option value="TT">TT</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="tournament">Tournament:</label>
                    <input type="text" id="tournament" name="tournament" required>
                </div>
                <div class="form-group">
                    <label for="commands">Commands:</label>
                    <input type="text" id="commands" name="commands" required>
                </div>
                <div class="form-group">
                    <label for="bet">Bet:</label>
                    <input type="text" id="bet" name="bet" required>
                </div>
                <div class="form-group">
                    <label for="coef">Coef:</label>
                    <input type="number" id="coef" name="coef" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="sum">Sum:</label>
                    <input type="number" id="sum" name="sum" step="1" required>
                </div>
                <div class="form-group">
                    <label for="result">Result:</label>
                    <select id="result" name="result" required>
                        <option value="Win">Win</option>
                        <option value="Lose">Lose</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
                <button type="submit">Add Bet</button>
            </form>
        </div>
    `;

    // Add event listener to the form
    document.getElementById('newBetForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newBet = Object.fromEntries(formData.entries());

        // Convert numeric fields to numbers and add bet_date
        newBet.coef = parseFloat(newBet.coef);
        newBet.sum = parseInt(newBet.sum);
        newBet.bet_date = today;

        console.log('New bet to be added:', newBet);

        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                console.log('Current data:', data);
                data.push(newBet);
                console.log('Updated data:', data);
                return fetch('db.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(text => {
                console.log('Server response:', text);
                alert('Bet added successfully!');
                // Optionally, refresh the dashboard or bet list here
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to add bet. Please try again.');
            });
    });
}