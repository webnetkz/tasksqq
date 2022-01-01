import { initTaskBoard } from "./taskBoard.js";
export function initSettings() {
    // Первый вход в приложение
    if(!localStorage.getItem('settings')) {
        let settings = {'active_task_board':'Second'};
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);
        initTaskBoard();
    } else {
        initTaskBoard();
    }
}
