const dayOfWeekElement = document.querySelector('.dayweek');

function getDayOfWeek() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];

}

dayOfWeekElement.textContent = `It's ${getDayOfWeek()}`;