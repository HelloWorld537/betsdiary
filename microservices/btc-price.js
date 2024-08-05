// Функция для получения данных о цене Биткоина
async function fetchBitcoinPrice() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await response.json();
    return data.bitcoin.usd;
}

// Функция для обновления элемента с ценой
async function updateBitcoinPrice() {
    const price = await fetchBitcoinPrice();
    const priceElement = document.querySelector('.btc-price');
    priceElement.innerHTML = `Btc Price: <span style="font-family: 'Anton', sans-serif; font-size:17px;">${price.toLocaleString('en-US')}<span class="green" style="margin-left: 2px;">$</span></span>`;
}

// Инициализация и интервал обновления
updateBitcoinPrice();
setInterval(updateBitcoinPrice, 60000); // Обновляем каждые 60 секунд
