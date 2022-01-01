import { showError } from "./error.js";

export function initTaskBoard() {
    initTaskBoardMenu();
}

export function createBoard() {
    document.querySelector('#createTaskBoard').addEventListener('click', () => {
        let task_boards = localStorage.getItem('task_boards');
        task_boards = JSON.parse(task_boards);

        // Переписать
        // временное решение по созданию нового списка
        let newBoard = prompt('Имя нового списка');
        if(newBoard == '' && newBoard !== false) return;

        // Запрещаем создовать одинаковые название у списков
        for(let board in task_boards) {
            if(task_boards[board] == newBoard) {
                showError('Имя списка уже используется');
                return;
            }
        }

        // Делаем активным новый список
        let settings = localStorage.getItem('settings');
        settings = JSON.parse(settings);
        settings.active_task_board = newBoard;
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);

        // Добавляем новый список в task_boards
        let i = Object.keys(task_boards).length;
        task_boards[i] = newBoard;
        task_boards = JSON.stringify(task_boards);
        localStorage.setItem('task_boards', task_boards);

        window.location.reload();
    });
}

export function changeActiveBoard(elem) {
    // Если не кнопка создания нового списка
    if(elem.id != document.querySelector('#createTaskBoard').id) {
        document.querySelector('.activeBoard').classList.remove('activeBoard'); // Удаляем стиль активного списка
        elem.classList.add('activeBoard'); // Добавляем выбранному элементу активность

        // Заменяем активный список в настройках
        let settings = localStorage.getItem('settings');
        settings = JSON.parse(settings);
        settings.active_task_board = elem.innerText;
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);

        // Заменем заголовок
        document.querySelector('.headerTop h2').innerText = elem.innerText;
    }
}

function initTaskBoardMenu() {
    let activeTaskBoard = localStorage.getItem('settings');
    activeTaskBoard = JSON.parse(activeTaskBoard);
    activeTaskBoard = activeTaskBoard.active_task_board;

    let task_boards = localStorage.getItem('task_boards');
    task_boards = JSON.parse(task_boards);
    let ulTaskBoards = document.querySelector('menu > div > ul');
    ulTaskBoards.innerHTML = '';

    for(let board in task_boards) {
        let boardElement = document.createElement('li');
        boardElement.classList.add('board');
        boardElement.innerText = task_boards[board];

        if(task_boards[board] == activeTaskBoard) {
            boardElement.classList.add('activeBoard');
        }

        ulTaskBoards.appendChild(boardElement);
    }
    ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard">+ Добавить список</li>`;
}

