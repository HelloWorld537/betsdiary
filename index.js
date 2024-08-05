
const rightPanel = document.querySelector('.right-panel');

let balance = 500;

function updateBalance(newBalance) {
    balance = newBalance;
    // Здесь можно добавить код для обновления отображения баланса на главной странице, если это необходимо
}


// Функция для создания шаблона профитов

// Функция для создания шаблона новостей
function createNewsItem(heading, content) {
    return `
        <div class="news-item">
            <div class="news-item-heading">${heading}</div>
            <p>${content}</p>
        </div>
    `;
}

// Функция для создания шаблона новостей
function createNewsItems(newsArray) {
    return newsArray.map(news => createNewsItem(news.heading, news.content)).join('');
}




window.updateBalance = updateBalance;

// Функция для генерации панели Analysing



generateDashboard();

