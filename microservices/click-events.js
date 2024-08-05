const dashAElement = document.querySelector('.dash-a');
const dashAnElement = document.querySelector('.dash-analysing');
const dashMeElement = document.querySelector('.dash-memorandum');

dashAElement.addEventListener('click', () => {
    generateDashboard();
});

dashAnElement.addEventListener('click', () => {
    generateAnalysing();
});
dashMeElement.addEventListener('click', () => {
    generateMemorandum();
});
