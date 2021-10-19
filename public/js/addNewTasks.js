// Отображение скрытие списка задачников
function showMenuTasks() {
    let menuTasks = document.querySelector('.menuTasks');
    if(menuTasks.style.left == '-100vw') {
        menuTasks.style.left = '0px';
    } else {
        menuTasks.style.left = '-100vw';
    }
}

// Заменяет заголовок задачника на приглошение к вводу названия нового задачника
function addNewList(elem) {
    elem.innerHTML = '<input id="newList" type="text" class="inp" onchange="appendNewTasksList(this.value);" placeholder="new list">';
    elem.removeAttribute('onclick');
    elem.setAttribute('onchange', 'newList(this);');
}

// Принимает новое название задачника для 
function newList(elem) {
    elem.innerHTML = '+ Create new list';
    elem.removeAttribute('onchange');
    elem.setAttribute('onclick', 'addNewList(this);');
}

// Добавляет новый задачник в хранилище
function appendNewTasksList(val) {
    if(val == ' ') {
        showError("Fill in the title");
        return false;
    }
    localStorage.setItem('task'+(localStorage.length + 1), '{"tasker":"'+val+'"}');
    if(document.querySelector('.menuTasks').style.left == '0px') {
        document.querySelector('.menuTasks').style.left = '-100vw';
    }
    // Обновляет меню задачников
    showAllList();
    // Делает новый добавленный задачник активным
    showAllListOfTask(document.querySelector('#task'+(localStorage.length)));
    // Сворачивает меню задачников
    showMenuTasks();
    // Обновить список задач
    updateList(localStorage.getItem('user'));
}

window.onload = function() {
    // Проверка на авторизацию пользователя
    if(!localStorage.getItem('user')) {
        location.href = 'index';
    }
    // Проверка на первый вход или отсутствие действующих списков задач
    if(localStorage.length == 1) {
        document.querySelector('.menuTasks').style.left = '0px';
    } else {
        showAllList();
        // Обновить список задач
        updateList(localStorage.getItem('user'));
    }
    // Проверяет активный задачник
    let checkActiveList = localStorage.getItem('user');
    if(checkActiveList != 'true') {
        let dataTasker = JSON.parse(localStorage.getItem(checkActiveList));
        document.querySelector('h1').innerText = dataTasker.tasker;
    }
};

function showAllList() {
    // Если есть действующие задачники, то отображает их в меню
    let list = document.querySelector('.menuTasksList ul');
    list.innerHTML = '';
    for(let i = 1; i < localStorage.length+1; i++) {
        // Получает JSON строку всего задачника
        let resTask = localStorage.getItem('task'+i);
        if(resTask) {
            let task = document.createElement('li');
            let dataTask = JSON.parse(resTask);
            let nameTask = dataTask.tasker;
            task.innerText = nameTask;
            task.classList.add('menuTasksItem');
            task.id = 'task'+i;
            task.setAttribute('onclick', 'showAllListOfTask(this)');
            list.appendChild(task);
        }
    }
}

// Делает активным выбранный список
function showAllListOfTask(elem) {
    let res = localStorage.getItem(elem.id);
    dataTask = JSON.parse(res);
    document.querySelector('h1').innerText = dataTask.tasker;
    // Деактивирует активный элемент меню
    if(document.querySelector('.activeMenuTasksItem')) {
        document.querySelector('.activeMenuTasksItem').classList.remove('activeMenuTasksItem');
    }
    // Назначает новый элемент активным
    document.querySelector('#'+elem.id).classList.add('activeMenuTasksItem');
    localStorage.setItem('user', elem.id);
    // Сворачивает меню задачников
    showMenuTasks();
    // Обновить список задач
    updateList();
}