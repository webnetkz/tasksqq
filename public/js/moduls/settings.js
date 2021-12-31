import { initTaskBoard } from "./taskBoard.js";
export function initSettings() {
    if(!localStorage.getItem('settings')) {
        let settings = {'active_task_board':'test'};
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);
        initTaskBoard();
    } else {
        initTaskBoard();
    }
}