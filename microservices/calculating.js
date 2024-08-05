// Функция для вычисления винрейта
function calculateWinrate(data) {
    const totalBets = data.length;
    const wins = data.filter(item => item.result === 'Win').length;
    const winrate = (wins / totalBets) * 100;
    return winrate.toFixed(2); // Возвращаем винрейт с двумя знаками после запятой
}

// Функция для вычисления общего профита
function calculateAllTimeProfit(data) {
    return data.reduce((total, item) => {
        const sum = item.sum;
        const coef = item.coef;
        const profit = item.result === 'Win' ? sum * coef : -sum;
        return total + profit;
    }, 0).toFixed(2);
}

function calculateBetsSum(data) {
    // Проверяем, есть ли данные и является ли это массивом
    if (!Array.isArray(data)) {
        return 0; // Если данные не массив, возвращаем 0
    }

    // Возвращаем длину массива, которая соответствует количеству ставок
    return data.length;
}

function calculateROI(data) {
    if (!Array.isArray(data)) {
        throw new Error('Data must be an array of bets');
    }

    let totalProfit = 0;
    let totalInvestment = 0;

    data.forEach(bet => {
        totalInvestment += bet.sum;
        if (bet.result === 'Win') {
            totalProfit += bet.sum * bet.coef - bet.sum;
        } else {
            totalProfit -= bet.sum;
        }
    });
    console.log(totalProfit);
    console.log(totalInvestment);

    if (totalInvestment === 0) {
        return "Невозможно рассчитать ROI: общая сумма инвестиций равна нулю";
    }

    const roi = (totalProfit / totalInvestment) * 100;
    return roi.toFixed(2);
}


function calculateWeeklyProfit(data) {
    // Получаем текущую дату и время
    const currentDate = new Date();

    // Создаем дату начала текущей недели
    const currentWeekStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());

    // Создаем функцию для преобразования строки даты в объект Date
    const createDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    };

    // Фильтруем массив data, оставляя только ставки за текущую неделю
    const weeklyData = data.filter(item => {
        const betDate = createDate(item.bet_date);
        return betDate >= currentWeekStart && betDate <= currentDate;
    });

    // Если нет ставок за текущую неделю, возвращаем '0.00'
    if (weeklyData.length === 0) {
        return '0.00';
    }

    // Вычисляем общую прибыль за неделю
    const weeklyProfit = weeklyData.reduce((total, item) => {
        const sum = parseFloat(item.sum);
        const coef = parseFloat(item.coef);
        const profit = item.result === 'Win' ? sum * coef - sum : -sum;
        return total + profit;
    }, 0);

    // Возвращаем недельную прибыль, округленную до двух знаков после запятой
    return weeklyProfit.toFixed(2);
}



function calculateMonthlyProfit(data) {
    // Получаем текущую дату и время
    const currentDate = new Date();
    console.log('Current date:', currentDate);

    // Создаем дату начала текущего месяца
    const currentMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    console.log('Current month start:', currentMonthStart);

    // Создаем функцию для преобразования строки даты в объект Date
    const createDate = (dateString) => {
        const [day, month, year] = dateString.split('.');
        return new Date(year, month - 1, day);
    };

    // Фильтруем массив data, оставляя только ставки за текущий месяц
    const monthlyData = data.filter(item => {
        const betDate = createDate(item.bet_date);
        console.log('Bet date:', betDate, 'Item:', item);
        return betDate >= currentMonthStart && betDate <= currentDate;
    });
    console.log('Monthly data:', monthlyData);

    // Если нет ставок за текущий месяц, возвращаем '0.00'
    if (monthlyData.length === 0) {
        console.log('No bets for current month');
        return '0.00';
    }

    // Вычисляем общую прибыль за месяц
    const monthlyProfit = monthlyData.reduce((total, item) => {
        const sum = parseFloat(item.sum);
        const coef = parseFloat(item.coef);
        const profit = item.result === 'Win' ? sum * coef - sum : -sum;
        console.log('Item:', item, 'Profit:', profit, 'Total:', total + profit);
        return total + profit;
    }, 0);
    console.log('Total monthly profit:', monthlyProfit);

    // Возвращаем месячную прибыль, округленную до двух знаков после запятой
    const result = monthlyProfit.toFixed(2);
    console.log('Final result:', result);
    return result;
}

// Команды для отладки в консоли:
// const testData = [
//     { bet_date: '01.06.2023', sum: '100', coef: '2.0', result: 'Win' },
//     { bet_date: '15.06.2023', sum: '200', coef: '1.5', result: 'Loss' },
//     { bet_date: '30.05.2023', sum: '150', coef: '1.8', result: 'Win' }
// ];
// console.log(calculateMonthlyProfit(testData));