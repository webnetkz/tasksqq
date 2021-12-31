export function initTaskBoard() {
    let activeTaskBoard = localStorage.getItem('settings');
    activeTaskBoard = JSON.parse(activeTaskBoard);
    activeTaskBoard = activeTaskBoard.active_task_board;

    let taskBoards = {0:'First', 1: 'Second', 2: 'This is list', 3: 'Test test test', 4: 'Test test', 5: 'Test test', 6: 'Testtest'};
    taskBoards = JSON.stringify(taskBoards);
    localStorage.setItem('task_boards', taskBoards);

    console.log(activeTaskBoard);
    getTaskBoards();
}

function getTaskBoards() {
    let taskBoards = localStorage.getItem('task_boards');
    taskBoards = JSON.parse(taskBoards);

    let ulTaskBoards = document.querySelector('menu > div > ul');
    for(board in taskBoards) {
        let tmp = document.createElement('li');
        tmp.classList.add('board');
        ulTaskBoards.appendChild(tmp);
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard">+ Добавить список</li>`;
    }
}