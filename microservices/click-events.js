const dashAElement = document.querySelector('.dash-a');
const dashAnElement = document.querySelector('.dash-analysing');
const dashMeElement = document.querySelector('.dash-memorandum');
const addBetElement = document.querySelector('.add-bet');
const configElement = document.querySelector('.conf');

dashAElement.addEventListener('click', () => {
    generateDashboard();
});

dashAnElement.addEventListener('click', () => {
    generateAnalysing();
});
dashMeElement.addEventListener('click', () => {
    generateMemorandum();
});

addBetElement.addEventListener('click', () => {
    addNewBet();
});
configElement.addEventListener('click', () => {
    generateConfig();
});