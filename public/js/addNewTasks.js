

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