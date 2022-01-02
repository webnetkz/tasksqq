import { showError } from "./error.js";
import { showModal, closeModal } from "./modal.js";

export function initTaskBoard() {
    initTaskBoardMenu();
}

export async function createBoard() {
    document.querySelector('#createTaskBoard').addEventListener('click', () => {
        
        showModal(`Введите имя нового списка...<br><input type="text" class="inp"
            onchange="localStorage.setItem('tmp', this.value);
            let task_boards = localStorage.getItem('task_boards');
            task_boards = JSON.parse(task_boards);
            let nameNewBoard = localStorage.getItem('tmp');

            // Запрещаем создовать одинаковые название у списков
            for(let board in task_boards) {
                if(task_boards[board] == nameNewBoard) {
                    showError('Имя списка уже используется');
                    return;
                }
            }

            // Делаем активным новый список
            let settings = localStorage.getItem('settings');
            settings = JSON.parse(settings);
            settings.active_task_board = nameNewBoard;
            settings = JSON.stringify(settings);
            localStorage.setItem('settings', settings);

            // Добавляем новый список в task_boards
            let i = Object.keys(task_boards).length;
            task_boards[i] = nameNewBoard;
            task_boards = JSON.stringify(task_boards);
            localStorage.setItem('task_boards', task_boards);

            localStorage.removeItem('tmp');
            let modalBlock = document.querySelector('.modalBlock');
            modalBlock.querySelector('.modalClose').style.top = '-200px';
            modalBlock.querySelector('.modalContent').style.opacity = '0';
            modalBlock.style.background = 'rgba(0, 0, 0, 0)';
            let modalStyles = document.querySelector('#modalStyles');

            setTimeout(() => {

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

                let addBoard = document.createElement('li');
                addBoard.classList.add('board');
                addBoard.id = 'createTaskBoard';
                addBoard.innerText = '+ Добавить список';
                ulTaskBoards.appendChild(addBoard);

                modalBlock.remove();
                modalStyles.remove();
            }, 500);
            ">`);       
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

