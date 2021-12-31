export function initTaskBoard() {
    let activeTaskBoard = localStorage.getItem('settings');
    activeTaskBoard = JSON.parse(activeTaskBoard);
    console.log(activeTaskBoard);
}