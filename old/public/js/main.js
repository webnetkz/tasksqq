window.onload = startApp();

function startApp() {

    // Проверка на авторизацию пользователя
    if(!localStorage.getItem('settings')) {
        location.href = 'index';
    }

    // Проверка на первый вход или отсутствие действующих списков задач
    if(localStorage.length <= 1) {
        // Запрет на создание новой задачи, при отсутствии списка/ков
        let addBtn = document.querySelector('.addBtn');
        addBtn.removeAttribute('onclick');
        addBtn.setAttribute('onclick', 'showModal("Create new list", "newList")');
        // Создание первого списка
        showModal('We welcome you, this is your first visit to the app. Please create your first task list.', 1);
    } else {
        let addBtn = document.querySelector('.addBtn');
        addBtn.removeAttribute('onclick');
        addBtn.setAttribute('onclick', 'alert("Hi")');
    }

    // Отображение активного списка
    let settings = localStorage.getItem('settings'); 
    settings = JSON.parse(settings);
    if(!settings.active_list) {
        settings.active_list = 'CREATE LIST';
    }
    document.querySelector('h2').innerText = settings.active_list;

    // Отображение существующих списков задач
    let menuTasksList = document.querySelector('.menuTasksList > ul');
    menuTasksList.innerHTML = '';
    let sortPosition = [];
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if(key != 'settings') {
            let settings = localStorage.getItem('settings'); 
            settings = JSON.parse(settings);

            nameList = localStorage.getItem(key)
            nameList = JSON.parse(nameList);

            let newElementMenu = document.createElement('li');
            if(settings.active_list == nameList.name) {
                newElementMenu.classList.add('activeMenuTasksItem');
                newElementMenu.setAttribute('onclick', 'activeList(this)');
            } else {
                newElementMenu.classList.add('menuTasksItem');
                newElementMenu.setAttribute('onclick', 'activeList(this)');
            }


            let list = localStorage.getItem(key); 
            list = JSON.parse(list);
            newElementMenu.setAttribute('position', list.position);

            sortPosition.push(list.position);

            newElementMenu.innerText = list.name;
            menuTasksList.appendChild(newElementMenu);
        }
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    sortPosition.sort(compareNumbers);
    let allList = document.querySelectorAll('.menuTasksList > ul > li');
    let newList = document.createElement('ul');
    let nowList = document.querySelector('.menuTasksList > ul');
    let menuList = document.querySelector('.menuTasksList');

    for (let i = 0; i < allList.length; i++) {
        newList.appendChild(nowList.querySelector('li[position="'+sortPosition[i]+'"]'));
    }
    nowList.remove();
    menuList.appendChild(newList);

    settings_list();
}

// Выбор активного списка задач
function activeList(elem) {
    let settings = localStorage.getItem('settings'); 
    settings = JSON.parse(settings);

    settings.active_list = elem.innerText;
    settings = JSON.stringify(settings);
    localStorage.setItem('settings', settings);


    document.querySelector('.activeMenuTasksItem').classList.add('menuTasksItem');
    document.querySelector('.activeMenuTasksItem').classList.remove('activeMenuTasksItem');
    elem.classList.add('activeMenuTasksItem');
    startApp();
}

    

// Создать новый список задач
function create_task(elem) {
    if(elem.parentNode.previousSibling.previousSibling.value == '' || elem.parentNode.previousSibling.previousSibling.value == ' ') {
        showError('Fill in the name of the new list');
    } else {
        let newTask = elem.parentNode.previousSibling.previousSibling.value;
        let settings = localStorage.getItem('settings');
        set = JSON.parse(settings);
        set.active_list = newTask;

        set = JSON.stringify(set);
        localStorage.setItem('settings', set)

        document.querySelector('h2').innerText = newTask;

        localStorage.setItem(newTask, '{"name": "'+newTask+'", "position": 100}');
        document.querySelector('.modalBlock').remove();
        startApp();
    }
}

// Добавить задачу
function showAppenderNewTask() {
    let addNewTask = document.querySelector('.addNewTask');
    addNewTask.style.display = 'block';
    addNewTask.style.top = '0px';
}

// Закрыть добавление задачи
document.querySelector('.closeBtn').addEventListener('click', () => {
    document.querySelector('.addNewTask').style.display = 'none';
});

// Открыть список задач
function showMenuTasks() {
    let menuTasks = document.querySelector('.menuTasks');
    if(menuTasks.style.left == '-100vw') {
        menuTasks.style.left = '0px';

        let addBtn = document.querySelector('.addBtn');
        addBtn.removeAttribute('onclick');
        addBtn.setAttribute('onclick', 'showModal("Create new list", "newList")');
    } else {
        menuTasks.style.left = '-100vw';
        let addBtn = document.querySelector('.addBtn');
        if(localStorage.length <= 1) {
            addBtn.removeAttribute('onclick');
            addBtn.setAttribute('onclick', 'showModal("Create new list", "newList")');
        } else {
            addBtn.removeAttribute('onclick');
            addBtn.setAttribute('onclick', 'alert("Hi")');
        }
    }
}

// Добавляет значек настроек активному списку меню
function settings_list() {
    let list = document.querySelector('.activeMenuTasksItem');
    let settings = document.createElement('img');
    settings.src = '/public/img/settings.png';
    settings.style.cssText = `
        position: absolute;
        right: 30px;
    `;
    settings.setAttribute('onclick', 'show_settings_list(this);');

    if(list) {
        list.appendChild(settings);
    }
}

// Отображение настроек списка задач
function show_settings_list(elem) {
    showModal('<h4 style="display: inline-block;">Name:  <input type="text" class="inp" value="'+elem.parentNode.innerText+'" onchange="change_name_list(this)"></h4><h4 style="display: inline-block;">Position:  <i style="margin-left: 50px; margin-right: 5px;font-size: 1.3rem;" onclick="change_position_list(this);"> - </i><span style="color: var(--mainColor)">'+elem.parentNode.getAttribute('position')+'</span><i style="margin-left: 5px; font-size: 1.3rem;" onclick="change_position_list(this, 1);"> + </i></h4><span class="btn" style="display: block; text-align: center; margin-top: 20px;" onclick="del_list()">Delete</span>');
}

// Удаление списка
// function del_list() {
//     let settings = localStorage.getItem('settings');
//     settings = JSON.parse(settings);
//     console.log(settings.active_list);
//     localStorage.removeItem(settings.active_list);
// }

function change_position_list(elem, meaning) {
    let settings = localStorage.getItem('settings');
    settings = JSON.parse(settings);
    let list = localStorage.getItem(settings.active_list);
    list = JSON.parse(list);
    if(meaning) {
        elem.previousSibling.innerText = Number(elem.previousSibling.innerText) + 1;
        list.position = elem.previousSibling.innerText;
    } else {
        elem.nextSibling.innerText = Number(elem.nextSibling.innerText) - 1;
        list.position = elem.nextSibling.innerText;
    }
    list = JSON.stringify(list);
    localStorage.setItem(settings.active_list, list)

    startApp();
}

function change_name_list(elem) {
    let settings = localStorage.getItem('settings');
    settings = JSON.parse(settings);
    let list = localStorage.getItem(settings.active_list);
    list = JSON.parse(list);
    list.name = elem.value;
    list = JSON.stringify(list);
    localStorage.setItem(settings.active_list, list);
    settings.active_list = elem.value;
    settings = JSON.stringify(settings);
    localStorage.setItem('settings', settings);

    startApp();
}
