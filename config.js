function generateConfig() {
    rightPanel.innerHTML = `
    <div class="config-container">
        <h3>Current Balance: <span id="currentBalance">${window.balance}</span>$</h3>
        <input type="number" id="balanceInput" placeholder="Enter new balance">
        <button id="updateBalance">Update Balance</button>
    </div>
    `;

    // Добавляем обработчик события для кнопки обновления баланса
    document.getElementById('updateBalance').addEventListener('click', function () {
        const newBalance = parseFloat(document.getElementById('balanceInput').value);

        if (isNaN(newBalance)) {
            alert('Please enter a valid number');
            return;
        }

        // Используем глобальную функцию updateBalance для изменения баланса
        window.updateBalance(newBalance);

        // Обновляем отображение баланса на странице конфигурации
        document.getElementById('currentBalance').textContent = newBalance;

        // Очищаем поле ввода
        document.getElementById('balanceInput').value = '';

        alert('Balance updated successfully!');
    });
}