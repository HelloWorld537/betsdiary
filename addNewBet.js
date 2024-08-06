function addNewBet() {
    const today = new Date().toLocaleDateString('ru-RU');

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
                    <input type="text" id="coef" name="coef" required>
                </div>
                <div class="form-group">
                    <label for="sum">Sum:</label>
                    <input type="text" id="sum" name="sum"  required>
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

    document.getElementById('newBetForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(this);
        const newBet = Object.fromEntries(formData.entries());

        newBet.coef = parseFloat(newBet.coef);
        newBet.sum = parseInt(newBet.sum);
        newBet.bet_date = today;
        newBet.id = Date.now(); // Добавляем уникальный id

        fetch('https://betsdiary.onrender.com/api/bets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBet)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                console.log('Success:', data);
                alert('Bet added successfully!');
                // Опционально: обновите отображение ставок на странице
                updateBetsDisplay();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to add bet. Please try again.');
            });
    });
}

// Функция для обновления отображения ставок
function updateBetsDisplay() {
    fetch('https://betsdiary.onrender.com/api/bets')
        .then(response => response.json())
        .then(bets => {
            console.log('Updating bets display with:', bets);
            // Здесь вы можете обновить отображение ставок на странице
        })
        .catch(error => console.error('Error:', error));
}