// Функция для добавления активного класса
function addActiveClass() {
    const dashboard = document.querySelector('.dashboard');
    const analysing = document.querySelector('.analysing');
    const memorandum = document.querySelector('.memorandum');
    const dashAElement = document.querySelector('.dash-a');
    const dashAnElement = document.querySelector('.dash-analysing');
    const dashMeElement = document.querySelector('.dash-memorandum');

    if (dashboard) {
        dashAElement.classList.add('active');
        dashAnElement.classList.remove('active');
        dashMeElement.classList.remove('active');
    } else if (analysing) {
        dashAnElement.classList.add('active');
        dashAElement.classList.remove('active');
        dashMeElement.classList.remove('active');
    } else if (memorandum) {
        dashAnElement.classList.remove('active');
        dashAElement.classList.remove('active');
        dashMeElement.classList.add('active');
    } else {
        console.log('=(');
    }
}
