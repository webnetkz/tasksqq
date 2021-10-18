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
    localStorage.setItem('task'+(localStorage.length + 1), val);
    if(document.querySelector('.menuTasks').style.left == '0px') {
        document.querySelector('.menuTasks').style.left = '-100vw';
    }
    // Обновляет меню задачников
    showAllList();
    // Делает новый добавленный задачник активным
    showAllListOfTask(document.querySelector('#task'+(localStorage.length)));
    // Сворачивает меню задачников
    showMenuTasks();
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
    }
    // Проверяет активный задачник
    let checkActiveList = localStorage.getItem('user');
    if(checkActiveList != true) {
        document.querySelector('h1').innerText = localStorage.getItem(checkActiveList);
    }
};

function showAllList() {
    // Если есть действующие задачники, то отображает их в меню
    let list = document.querySelector('.menuTasksList ul');
    for(let i = 1; i < localStorage.length+1; i++) {
        let resTask = localStorage.getItem('task'+i);
        let task = document.createElement('li');
        task.innerText = resTask;
        task.classList.add('menuTasksItem');
        task.id = 'task'+i;
        task.setAttribute('onclick', 'showAllListOfTask(this)');
        list.appendChild(task);
    }
}

// Делает активным выбранный список
function showAllListOfTask(elem) {
    let res = localStorage.getItem(elem.id);
    document.querySelector('h1').innerText = res;
    // Деактивирует активный элемент меню
    if(document.querySelector('.activeMenuTasksItem')) {
        document.querySelector('.activeMenuTasksItem').classList.remove('activeMenuTasksItem');
    }
    // Назначает новый элемент активным
    document.querySelector('#'+elem.id).classList.add('activeMenuTasksItem');
    localStorage.setItem('user', elem.id);
    // Сворачивает меню задачников
    showMenuTasks();
}