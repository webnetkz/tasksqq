function updateCheck(elem) {
    // Меняет задачу на выполненую
        // Меняет Радио на Чек
        let father = elem.parentNode;
        elem.classList.add('checkMark');
        elem.classList.remove('radio');
        // Перечеркивает текст
        let contentTask = father.querySelector('.taskText');
        contentTask.classList.add('taskTextChecked');
        contentTask.classList.add('taskText');

        elem.removeAttribute('onclick');
        elem.setAttribute('onclick', 'unUpdateCheck(this)');
        let dataTasker = localStorage.getItem(localStorage.getItem('user'));
        dataTasker = JSON.parse(dataTasker);

        dataTasker[elem.id].status = false;
        dataTasker = JSON.stringify(dataTasker);
        localStorage.setItem(localStorage.getItem('user'), dataTasker);
};
function unUpdateCheck(elem) {
    // Меняет выполненую задачу, на невыполненую 
        // Меняет чек на радио
        let father = elem.parentNode;
        elem.classList.add('radio');
        elem.classList.remove('checkMark');
        // Уберает перечеркивание текста
        let contentTask = father.querySelector('.taskTextChecked');
        contentTask.classList.add('taskText');
        contentTask.classList.remove('taskTextChecked');

        elem.removeAttribute('onclick');
        elem.setAttribute('onclick', 'updateCheck(this)');

        let dataTasker = localStorage.getItem(localStorage.getItem('user'));
        dataTasker = JSON.parse(dataTasker);

        dataTasker[elem.id].status = true;
        dataTasker = JSON.stringify(dataTasker);
        localStorage.setItem(localStorage.getItem('user'), dataTasker);
};


// Раскрытие задачи
function showMore(allTaskText) {
    allTaskText.addEventListener('click', () => {
        if(allTaskText.style.textOverflow == 'clip') {
            allTaskText.style.textOverflow = 'ellipsis';
            allTaskText.style.maxHeight = '3rem';
            allTaskText.style.paddingBottom = '0';
            allTaskText.style.borderBottom = '0';
            if(allTaskText.querySelector('span')) {
                for(let allElems of allTaskText.querySelectorAll('span')) {
                    allElems.remove();
                }
            }
        } else {
            allTaskText.style.textOverflow = 'clip';
            allTaskText.style.maxHeight = '100%';
            allTaskText.style.paddingBottom = '1rem';
            allTaskText.style.borderBottom = '1px solid rgb(180,180,181)';

            let dataTasker = JSON.parse(localStorage.getItem(localStorage.getItem('user')));
            let task = allTaskText.previousElementSibling.id;

            if(dataTasker[task].date !== 'null' && dataTasker[task].date != null) {
                if(dataTasker[task].time !== 'null' && dataTasker[task].time != null) {
                    allTaskText.innerHTML += '<span class="date" style="display: block; font-size: 1rem;">'+dataTasker[task].date+'</span><span class="time" style="display: block; font-size: 1rem;">'+dataTasker[task].time+'</span>';
                } else {
                    allTaskText.innerHTML += '<span class="date" style="display: block; font-size: 1rem;">'+dataTasker[task].date+'</span>';
                }
            }
        }
    });
}
        

// Отабражает панель добавления новой задачи
function showAppenderNewTask() {
    let addNewTask = document.querySelector('.addNewTask');
    addNewTask.style.display = 'block';
    addNewTask.style.top = '0px';
}


// Закрыть добавление задачи
document.querySelector('.closeBtn').addEventListener('click', () => {
    document.querySelector('.addNewTask').style.display = 'none';
});

function updateList() {
    let allTasks = document.querySelector('#allTasks');
    allTasks.innerHTML = '';
    let dataTasker = localStorage.getItem(localStorage.getItem('user'));
    if(dataTasker) {
        dataTasker = JSON.parse(dataTasker);
        for(let i = 1; i < Object.keys(dataTasker).length; i++) {
            let thisTaskBtn;
            let thisTaskText;
        
            if(dataTasker[i].status == true) {
                thisTaskBtn = 'radio';
                thisTaskText = 'taskText';
                thisOnClick = 'updateCheck(this);';
            } else {
                thisTaskBtn = 'checkMark';
                thisTaskText = 'taskTextChecked';
                thisOnClick = 'unUpdateCheck(this);';
            }
                
            showTask = '<div class="task"><div class="'+thisTaskBtn+'" id="'+i+'" onclick="'+thisOnClick+'"></div><div class="'+thisTaskText+'">'+dataTasker[i].task+'</div></div>';
            allTasks.innerHTML += showTask;
        }
    
    }
    for(let allTaskText of document.querySelectorAll('.taskText')) {
        showMore(allTaskText);
    }
    for(let allTaskText of document.querySelectorAll('.taskTextChecked')) {
        showMore(allTaskText);
    }
}



// Сохранение новой задачи
document.querySelector('#save').addEventListener('click', () => {
    // Получение значения всех полей новой задачи
    let newTaskContent = document.querySelector('#newTask').value.replace(/\r?\n/g, " ");
    if(newTaskContent == '') return false;
    let newTaskDate = document.querySelector('#date').value.replace(/\r?\n/g, " ");
    if(newTaskDate == '') newTaskDate = null;
    let newTaskTime = document.querySelector('#time').value.replace(/\r?\n/g, " ");
    if(newTaskTime == '') newTaskTime = null;

    // Получение название задачника
    let tasker = localStorage.getItem('user');

    // Получение данных задачника, конвертация в JSON
    let getLastTaskOfTasker = localStorage.getItem(tasker);
    getLastTaskOfTasker = JSON.parse(getLastTaskOfTasker);
    
    if(Object.keys(getLastTaskOfTasker).length == 1) {
        // Если задач нет в задачнике
        task = 1;
        localStorage.setItem(tasker, '{"tasker": "'+getLastTaskOfTasker.tasker+'", "'+task+'": {"status": true, "task": "'+newTaskContent+'", "date": "'+newTaskDate+'", "time": "'+newTaskTime+'"}}');
    } else {
        // Если задачи уже добавлены в задачник
        let nameNewTasker = Object.keys(getLastTaskOfTasker).length;
        getLastTaskOfTasker[nameNewTasker] = {"status": true, "task": newTaskContent, "date": newTaskDate, "time": newTaskTime};
        getLastTaskOfTasker = JSON.stringify(getLastTaskOfTasker);
        localStorage.setItem(tasker, getLastTaskOfTasker);
    }

    // Очищает поля для создания новой задачи
    document.querySelector('#newTask').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('.addNewTask').style.display = 'none';

    for(let allTaskText of document.querySelectorAll('.taskText')) {
        showMore(allTaskText);
    }
    for(let allTaskText of document.querySelectorAll('.taskTextChecked')) {
        showMore(allTaskText);
    }
    updateList();
});