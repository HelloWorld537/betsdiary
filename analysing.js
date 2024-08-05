let currentFilters = {
    discipline: 'all',
    sumRange: '',
    coefficientRange: ''
};

function generateAnalysing() {
    const elementsPerPage = 4; // Количество элементов на странице

    rightPanel.innerHTML = `
      <div class="analysing">
        <div class="day">
          <div class="right-p">
            <div class="roi"><span class="text">Roi: </span><span class="bets-roi-analysing"> </span>%</div>
            <div class="winrate"><span class="text">Winrate:</span> <span class="bets-winrate-analysing"></span>%</div>
            <div class="profit"><span class="text">Profit:</span> <span class="alltimeprof-analysing">77</span>$</div>
            <div class="bets-calc"><span class="text">Sum:</span> <span class="bets-sum-analysing">338</span></div>
          </div>
        </div>
        <div class="filters">
          <div class="filters-heading">
            <div class="filter-item">
              <label for="discipline-filter">Discipline:</label>
              <select id="discipline-filter">
                <option value="all">All</option>
                <option value="CS">CS</option>
                <option value="dota">Dota</option>
                <option value="valorant">Valorant</option>
                <option value="tt">TT</option>
         
              </select>
            </div>
            <div class="filter-item">
              <label for="tournament-filter">Tournament:</label>
              <select id="tournament-filter">
                <option value="">All</option>
                <!-- Опции будут добавлены динамически -->
              </select>
            </div>
            <div class="filter-item">
              <label for="teams-filter">Teams:</label>
              <select id="teams-filter">
                <option value="">All</option>
                <!-- Опции будут добавлены динамически -->
              </select>
            </div>
            <div class="filter-item">
              <label for="team-filter">Team:</label>
              <select id="team-filter">
                <option value="">All</option>
                <!-- Опции будут добавлены динамически -->
              </select>
            </div>
                    <div class="filter-item">
                <label for="coef-filter">Coef Range:</label>
                <input type="text" id="coef-filter" placeholder="min-max">
            </div>
            <div class="filter-item">
                <label for="sum-filter">Sum Range:</label>
                <input type="text" id="sum-filter" placeholder="min-max">
            </div>
            <div class="filter-item">
              <label for="result-filter">Result:</label>
              <select id="result-filter">
                <option value="">All</option>
                <option value="Win">Win</option>
                <option value="Lose">Lose</option>
              </select>
            </div>
            <div class="filter-item">
              <label for="period-filter">Period:</label>
              <select id="period-filter">
                <option value="">All</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
        <div class="table">
          <div class="table-elements"></div>
          <div class="pag">
            </div>
        </div>
      </div>
    `;

    function generatePagination(currentPage, totalPages) {
        let paginationHtml = '';
        const visiblePages = 5; // Количество видимых страниц в пагинации

        // Calculate startPage and endPage considering last page scenario
        let startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
        const maxEndPage = Math.min(startPage + visiblePages - 1, totalPages);
        let endPage = Math.min(maxEndPage, totalPages);

        // Корректируем startPage и endPage, чтобы всегда отображалось нужное количество страниц
        if (endPage > totalPages) {
            startPage = Math.max(totalPages - visiblePages + 1, 1);
            endPage = totalPages;
        }

        // Добавляем кнопку "Предыдущая", если мы не на первой странице
        if (currentPage > 1) {
            paginationHtml += `<span class="page" data-page="${currentPage - 1}">&lt;</span>`;
        }

        // Добавляем номера страниц
        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                paginationHtml += `<span class="page active" data-page="${i}">${i}</span>`;
            } else {
                paginationHtml += `<span class="page" data-page="${i}">${i}</span>`;
            }
        }

        // Добавляем кнопку "Следующая", если мы не на последней странице
        if (currentPage < totalPages) {
            paginationHtml += `<span class="page" data-page="${currentPage + 1}">&gt;</span>`;
        }

        return paginationHtml;
    }

    fetch('https://betsdiary.onrender.com/api/bets')
        .then(response => response.json())
        .then(data => {
            function applyFilters(data) {
                let filteredData = data;

                if (currentFilters.discipline && currentFilters.discipline !== 'all') {
                    filteredData = filteredData.filter(item =>
                        item.discipline.toLowerCase() === currentFilters.discipline.toLowerCase()
                    );
                }

                if (currentFilters.sumRange) {
                    const [minSum, maxSum] = currentFilters.sumRange.split('-').map(Number);
                    if (!isNaN(minSum) && !isNaN(maxSum)) {
                        filteredData = filteredData.filter(item => item.sum >= minSum && item.sum <= maxSum);
                    } else if (!isNaN(minSum)) {
                        filteredData = filteredData.filter(item => item.sum >= minSum);
                    } else if (!isNaN(maxSum)) {
                        filteredData = filteredData.filter(item => item.sum <= maxSum);
                    }
                }

                if (currentFilters.coefficientRange) {
                    const [minCoef, maxCoef] = currentFilters.coefficientRange.split('-').map(Number);
                    if (!isNaN(minCoef) && !isNaN(maxCoef)) {
                        filteredData = filteredData.filter(item => item.coef >= minCoef && item.coef <= maxCoef);
                    } else if (!isNaN(minCoef)) {
                        filteredData = filteredData.filter(item => item.coef >= minCoef);
                    } else if (!isNaN(maxCoef)) {
                        filteredData = filteredData.filter(item => item.coef <= maxCoef);
                    }
                }

                console.log('Filtered data:', filteredData);
                renderTableData(filteredData);
            }

            const disciplineSelect = document.getElementById('discipline-filter');
            disciplineSelect.addEventListener('change', () => {
                currentFilters.discipline = disciplineSelect.value;
                applyFilters(data);
            });

            const sumInput = document.getElementById('sum-filter');
            sumInput.addEventListener('input', () => {
                currentFilters.sumRange = sumInput.value;
                applyFilters(data);
            });

            const coefficientInput = document.getElementById('coef-filter');
            coefficientInput.addEventListener('input', () => {
                currentFilters.coefficientRange = coefficientInput.value;
                applyFilters(data);
            });

            // Инициализация таблицы
            renderTableData(data);

            function renderTableData(data, currentPage = 1) {  // Добавлено значение по умолчанию
                if (!data || data.length === 0) {
                    const tbEl = document.querySelector('.table-elements');
                    if (tbEl) {
                        tbEl.innerHTML = '<div>No data available</div>';
                    }
                    updateStatistics([]);
                    return;
                }

                const startIndex = (currentPage - 1) * elementsPerPage;
                const endIndex = Math.min(startIndex + elementsPerPage, data.length);

                const tableData = data.slice(startIndex, endIndex);

                const generatedHtml = tableData.map(item => createTableElement(item)).join('');

                const tbEl = document.querySelector('.table-elements');

                if (tbEl) {
                    tbEl.innerHTML = generatedHtml;

                    // Добавляем обработчик событий для кнопок удаления
                    tbEl.addEventListener('click', function (e) {
                        if (e.target.classList.contains('delete-bet')) {
                            const betElement = e.target.closest('.table-element');
                            const betId = betElement.dataset.id;
                            if (confirm('Are you sure you want to delete this bet?')) {
                                deleteBet(betId);
                            }
                        }
                    });

                    const paginationContainer = document.querySelector('.pag');
                    if (paginationContainer) {
                        const totalPages = Math.ceil(data.length / elementsPerPage);
                        paginationContainer.innerHTML = generatePagination(currentPage, totalPages);

                        const currentPageElement = paginationContainer.querySelector(`[data-page="${currentPage}"]`);
                        if (currentPageElement) {
                            currentPageElement.classList.add('active');
                        }
                    }
                }

                updateStatistics(data);
            }

            // Выносим обработчик событий за пределы функции renderTableData
            const paginationContainer = document.querySelector('.pag');
            paginationContainer.addEventListener('click', (event) => {
                const clickedElement = event.target;
                if (clickedElement.classList.contains('page')) {
                    currentPage = parseInt(clickedElement.dataset.page, 10);
                    renderTableData(data, currentPage);
                }
            });

            addActiveClass();
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });

}

function createTableElement(item) {
    const resultColor = item.result === 'Win' ? '#2ACC35' : 'red';
    return `
        <div class="table-element" data-id="${item.id}">
            ${Object.entries(item)
            .filter(([key]) => key !== 'id') // Исключаем id из вывода
            .map(([key, value]) => {
                const isNumeric = !isNaN(value) && typeof value === 'number';
                if (key === 'result') {
                    return `<div class="${key}" style="color: ${resultColor}">${value}</div>`;
                }
                return `<div class="${key} ${isNumeric ? 'anton-font' : ''}">${value}</div>`;
            }).join('')}
            <div class="delete-bet">✖</div>
        </div>
    `;
}
function updateStatistics(data) {
    const alltimeProf = calculateAllTimeProfit(data);
    const betsSum = calculateBetsSum(data);
    const roi = calculateROI(data);
    const winrate = calculateWinrate(data);

    document.querySelector('.alltimeprof-analysing').textContent = isNaN(alltimeProf) ? '0.00' : alltimeProf.toFixed(2);
    document.querySelector('.bets-sum-analysing').textContent = isNaN(betsSum) ? '0' : betsSum.toString();
    document.querySelector('.bets-roi-analysing').textContent = isNaN(roi) ? '0.00' : roi.toFixed(2);
    document.querySelector('.bets-winrate-analysing').textContent = isNaN(winrate) ? '0.00' : winrate.toFixed(2);
}

function calculateAllTimeProfit(data) {
    if (!Array.isArray(data) || data.length === 0) return 0;

    return data.reduce((total, bet) => {
        if (typeof bet.sum !== 'number' || typeof bet.coef !== 'number') return total;
        const profit = bet.result === 'Win' ? bet.sum * (bet.coef - 1) : -bet.sum;
        return total + profit;
    }, 0);
}

function calculateBetsSum(data) {
    return Array.isArray(data) ? data.length : 0;
}

function calculateROI(data) {
    if (!Array.isArray(data) || data.length === 0) return 0;

    const totalInvestment = data.reduce((total, bet) => {
        return total + (typeof bet.sum === 'number' ? bet.sum : 0);
    }, 0);
    const totalProfit = calculateAllTimeProfit(data);
    return totalInvestment !== 0 ? (totalProfit / totalInvestment) * 100 : 0;
}

function calculateWinrate(data) {
    if (!Array.isArray(data) || data.length === 0) return 0;

    const wins = data.filter(bet => bet.result === 'Win').length;
    return (wins / data.length) * 100;
}

function deleteBet(id) {
    fetch(`/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Success:', data);
            // Обновляем отображение после удаления
            generateAnalysing();
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to delete bet. Please try again.');
        });
}