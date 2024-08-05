// Функция для генерации панели Dashboard с динамическим винрейтом и профитом
function generateDashboard() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const winrate = calculateWinrate(data);
            const allTimeProfit = calculateAllTimeProfit(data);
            const weeklyProfit = calculateWeeklyProfit(data);
            const monthlyProfit = calculateMonthlyProfit(data);
            console.log(weeklyProfit + 'weeklyProfit');

            rightPanel.innerHTML = `
                <div class="dashboard">
                    <div class="left-side">
                        <div class="top-profit">
                            ${createTopProfit(Number(balance) + Number(allTimeProfit), data)}
                        </div>
                        <div class="left-side-profit">
                            ${createDashboardProfit(weeklyProfit, allTimeProfit, monthlyProfit, winrate)}
                        </div>
                    </div>
                    <div class="news">
                        <div class="heading">News</div>
                        <div class="news-items">
                      
                        </div>
                    </div>
                </div>
            `;

            // Вызов addActiveClass после обновления содержимого rightPanel
            addActiveClass();
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}





function createDashboardProfit(weekProfit, allTimeProfit, monthlyProfit, winrate) {
    return `
        <div class="wrp">
            <div class="profit-week-label label">Week Profit</div>
            <div class="profit-week sum">${weekProfit}<span class="green">$</span></div>
        </div>
        <div class="wrp">
            <div class="profit-all-label label">All time Profit</div>
            <div class="profit-all sum">${allTimeProfit}<span class="green">$</span></div>
        </div>
        <div class="wrp">
            <div class="profit-month-label label">Monthly Profit</div>
            <div class="profit-month sum">${monthlyProfit}<span class="green">$</span></div>
        </div>
        <div class="wrp">
            <div class="winrate-label label">Winrate</div>
            <div class="winrate sum">${Math.round(winrate)}<span class="green">%</span></div>
        </div>
    `;
}



// Функция для создания шаблона баланса и ROI
function createTopProfit(balance, data) {
    return `
        <div class="balance-wrapper">
            <div class="balance-label label">Balance</div>
            <div class="balance sum">${balance}<span class="green">$</span></div>
        </div>
        <div class="roi-wrapper">
            <div class="roi-label label">Roi</div>
            <div class="roi sum">${calculateROI(data)}<span class="green">%</span></div>
              
        </div>
    `;
}