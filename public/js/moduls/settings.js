import { initTaskBoard } from "./taskBoard.js";
export function initSettings() {
    if(!localStorage.getItem('settings')) {
        let settings = {'active_task_board':'test'};
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);
        initTaskBoard();
    } else {
        initTaskBoard();
        getTaskBoards();
    }
}

function getTaskBoards() {
    let taskBoards = localStorage.getItem('task_boards');
    taskBoards = JSON.parse(taskBoards);

    let ulTaskBoards = document.querySelector('menu > div > ul');
    for(let i = 0; i < taskBoards.length; i++) {
        let tmp = document.createElement('li');
        tmp.classList.add('board');
        tmp.innerText = taskBoards[i];

        ulTaskBoards.appendChild(tmp);
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard">+ Добавить список</li>`;
    }
}