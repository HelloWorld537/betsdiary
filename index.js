
const rightPanel = document.querySelector('.right-panel');

let balance = 500;

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






// Функция для генерации панели Analysing



generateDashboard();

