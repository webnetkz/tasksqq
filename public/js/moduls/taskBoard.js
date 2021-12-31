export function initTaskBoard() {
    let activeTaskBoard = localStorage.getItem('settings');
    activeTaskBoard = JSON.parse(activeTaskBoard);
    activeTaskBoard = activeTaskBoard.active_task_board;

    let taskBoards = {0:'First', 1: 'Second', 2: 'This is list', 3: 'Test test test', 4: 'Test test', 5: 'Test test', 6: 'Testtest'};
    taskBoards = JSON.stringify(taskBoards);
    localStorage.setItem('task_boards', taskBoards);

    console.log(activeTaskBoard);
}

