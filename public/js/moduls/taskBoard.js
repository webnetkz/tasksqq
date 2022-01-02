import { showError } from "./error.js";
import { showModal } from "./modal.js";

export function initTaskBoard() {
    initTaskBoardMenu();
}

export async function createBoard() {
    document.querySelector('#createTaskBoard').addEventListener('click', () => {
        
        showModal(`<input type="text" class="inp" placeholder="Введите имя нового списка..."
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
                modalBlock.remove();
                modalStyles.remove();
                window.location.reload();
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

export function deleteActiveBoard() {
    let settings = localStorage.getItem('settings');
    settings = JSON.parse(settings);
    let activeTaskBoard = settings.active_task_board;

    let task_boards = localStorage.getItem('task_boards');
    task_boards = JSON.parse(task_boards);

    for(let board in task_boards) {
        if(task_boards[board] == activeTaskBoard) {
            delete task_boards[board];
        }
    }

    settings.active_task_board = task_boards[0];
    settings = JSON.stringify(settings);
    localStorage.setItem('settings', settings);

    task_boards = JSON.stringify(task_boards);
    localStorage.setItem('task_boards', task_boards);

    window.location.reload();
}

export function renameActiveBoard() {
    let settings = localStorage.getItem('settings');
    settings = JSON.parse(settings);
    let activeTaskBoard = settings.active_task_board;
    
    showModal(`
        <p style="text-aling: center;">Переименовать список</p>
        <input type="text" class="inp" placeholder="${activeTaskBoard}" onchange="
        let task_boards = localStorage.getItem('task_boards');
        task_boards = JSON.parse(task_boards);
    
        for(let board in task_boards) {
            if(task_boards[board] == ${activeTaskBoard}) {
                task_boards[board] = this.value;
            }
        }
    
        settings = JSON.stringify(settings);
        localStorage.setItem('settings', settings);
    
        task_boards = JSON.stringify(task_boards);
        localStorage.setItem('task_boards', task_boards);
    
        window.location.reload();
        ">
    `);
}