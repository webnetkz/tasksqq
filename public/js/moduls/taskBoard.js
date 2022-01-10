import { showError } from "./error.js";
import { get_json, set_json } from "./localStorage.js";
import { showModal, closeModal } from "./modal.js";

export function initMenu() {
    initMenuLists();
}


function initMenuLists() {
    let activeList = get_json('settings').active_list;
    let lists = get_json('lists'); // Список всех задачников
    
    let ulTaskBoards = document.querySelector('menu > div > ul'); // Получаем и зачищаем меню
    ulTaskBoards.innerHTML = '';

    // Отрисовка меню
    for(let list in lists) {
        let boardElement = document.createElement('li');
        boardElement.classList.add('board');
        boardElement.innerText = lists[list];

        if(lists[list] == activeList) {
            boardElement.classList.add('activeBoard');
        }

        ulTaskBoards.appendChild(boardElement);
    }

    // Проверяем на создание первого списка задач
    if(lists[0] == undefined) {
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard" style="color: rgba(0,0,0,0);">+ Добавить список</li>`;
    } else {
        // Если нет, даем возможность смены активного списка задач
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard">+ Добавить список</li>`;
        changeActiveList();
    }

    // Запускаем возможность создания нового списка
    let createTaskBoard = document.querySelector('#createTaskBoard');
    createTaskBoard.addEventListener('click', () => {
        showModal(`<input type="text" class="inp" placeholder="Введите имя нового списка задач..."><button id="create_new_list" class="btn">Создать список</button>`);
        createList(); 
    });
}


export function createList() {
    let btnCreate = document.querySelector('#create_new_list');
    btnCreate.addEventListener('click', (btnCreate) => {
        let nameNewList = btnCreate.path[0].parentNode.querySelector('input').value;
        if(!nameNewList || nameNewList == ' ') {
            showError('Введите имя списка');
            return;
        }

        let lists = get_json('lists');
        localStorage.setItem('tmp', nameNewList);

        // Запрещаем создовать одинаковые название у списков
        for(let list in lists) {
            if(lists[list] == nameNewList) {
                showError('Имя списка уже используется');
                return;
            }
        }

        // Делаем активным новый список
        let settings = get_json('settings');
        settings.active_list = nameNewList;
        set_json('settings', settings);
        
        // Добавляем новый список в task_boards
        let i = Object.keys(lists).length;
        lists[i] = nameNewList;
        set_json('lists', lists);
        set_json(nameNewList, {});
        
        localStorage.removeItem('tmp');
        initMenuLists();
        closeModal(); 
    });
}


export function changeActiveList() {
    for(let elem of document.querySelectorAll('.board')) {
        elem.addEventListener('click', () => {
            if(elem.id != document.querySelector('#createTaskBoard').id) {
                document.querySelector('.activeBoard').classList.remove('activeBoard'); // Удаляем стиль активного списка
                elem.classList.add('activeBoard'); // Добавляем выбранному элементу активность
        
                // Заменяем активный список в настройках
                let settings = get_json('settings');
                settings.active_list = elem.innerText;
                set_json('settings', settings);
        
                // Заменем заголовок
                document.querySelector('.headerTop h2').innerText = elem.innerText;
            }
        });
    }
    
}


export function deleteActiveList() {
    showModal(`<button class="btn" id="deletedList">Удалить список задач</button>`);
    document.querySelector('#deletedList').addEventListener('click', () => {
        let activeList = get_json('settings').active_list;
        let lists = get_json('lists');

        // Случай при удалении последнего списка
        if(lists[1] == undefined) {
            set_json('settings', {"active_list": false}); // Создаем временные настройки
            set_json('lists', {});
            showModal(`<input type="text" class="inp" placeholder="Введите имя нового списка задач..."><button id="create_new_list" class="btn">Создать список</button>`, false);       
            createList();
            initMenu();
        }
    
        // Удаляем активный спиков из списка всех задачников и сам задачник
        for(let list in lists) {
            if(lists[list] == activeList) {
                localStorage.removeItem(lists[list]);
                delete lists[list];
            }
        }
    
        // При попытке удалить первый список, активным станет второй
        if(lists[0] != undefined) {
            settings.active_list = lists[0];
        } else {
            settings.active_list = lists[1];
        } 

        // Сохраняем изменения, удаляем модальное окно и обновляем меню
        set_json('settings', settings);
        set_json('lists', lists);
    
        initMenuLists();
        closeModal();
    });
}

export function createTask() {
    let activeList = get_json('settings').active_list;
    showModal('<input class="inp" type="text" placeholder="Введите задачу"><button class="btn" id="createNewTask">Создать задачу</button>');
    document.querySelector('#createNewTask').addEventListener('click', () => {
        let btnCreateTask = document.querySelector('#createNewTask');
        let nameNewTask = btnCreateTask.parentNode.querySelector('input').value;

        // Запрещаем создовать пустую задачу
        if(!nameNewTask || nameNewTask == ' ') {
            showError('Введите имя задачи');
            return;
        }

        let tasks = get_json(activeList);

        // Запрещаем создовать одинаковые названия задач
        for(let task in tasks) {
            if(tasks[task] == nameNewTask) {
                showError('Имя задачи в этом стиске уже используется');
                return;
            }
        }
        
        // Добавляем новый список в task_boards
        let i = Object.keys(tasks).length;
        tasks[i] = nameNewTask;
        set_json(activeList, tasks);
        
        closeModal();
    });
}

function initTasks() {
    let activeList = get_json('settings').active_list;
    let tasks = get_json(activeList);
    
    let ulTaskBoards = document.querySelector('menu > div > ul');
    ulTaskBoards.innerHTML = '';

    for(let list in lists) {
        let boardElement = document.createElement('li');
        boardElement.classList.add('board');
        boardElement.innerText = lists[list];

        if(lists[list] == active_list) {
            boardElement.classList.add('activeBoard');
        }

        ulTaskBoards.appendChild(boardElement);
    }
    if(lists[0] == undefined) {
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard" style="color: rgba(0,0,0,0);">+ Добавить список</li>`;
    } else {
        ulTaskBoards.innerHTML += `<li class="board" id="createTaskBoard">+ Добавить список</li>`;
        changeActiveList();
    }

    let createTaskBoard = document.querySelector('#createTaskBoard');
    createTaskBoard.addEventListener('click', () => {
        showModal(`<input type="text" class="inp" placeholder="Введите имя нового списка задач..."><button id="create_new_list" class="btn">Создать список</button>`);
        createList(); 
    });
}