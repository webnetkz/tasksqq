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

        let data = JSON.parse(localStorage.getItem(elem.id));
        data.status = false;
        data = JSON.stringify(data);
    
        localStorage.removeItem(elem.id);
        localStorage.setItem(elem.id, data);
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

        let data = JSON.parse(localStorage.getItem(elem.id));
        data.status = true;
        data = JSON.stringify(data);
    
        localStorage.removeItem(elem.id);
        localStorage.setItem(elem.id, data);
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
                allTaskText.querySelector('span').remove();
            }
        } else {
            allTaskText.style.textOverflow = 'clip';
            allTaskText.style.maxHeight = '100%';
            allTaskText.style.paddingBottom = '1rem';
            allTaskText.style.borderBottom = '1px solid rgb(180,180,181)';

            let idTask = JSON.parse(localStorage.getItem(allTaskText.previousSibling.id));

            if(idTask.date != 'null') {
                allTaskText.innerHTML += '<span class="date" style="display: block; font-size: 1rem;">'+idTask.date+'</span>';
            }
        }
    });
}


// Раскрыть задачу 
setTimeout(() => {
    for(let allTaskText of document.querySelectorAll('.taskText')) {
        showMore(allTaskText);
    }
    for(let allTaskText of document.querySelectorAll('.taskTextChecked')) {
        showMore(allTaskText);
    }
}, 1000);


        

// Добавить новую задачу
document.querySelector('.addBtn').addEventListener('click', () => {
    let addNewTask = document.querySelector('.addNewTask');
    addNewTask.style.display = 'flex';
    addNewTask.style.top = '0';
});

// Закрыть добавление задачи
document.querySelector('.closeBtn').addEventListener('click', () => {
    document.querySelector('.addNewTask').style.display = 'none';
});

function updateList() {
    // Получение списка задач
    const items = {...localStorage};

    let allTasks = document.querySelector('#allTasks');
    allTasks.innerHTML = '';

        for(let i = 1; i <= Object.keys(items).length; i++) {
            let item = items[i];
                item = JSON.parse(item);

            let thisTaskBtn;
            let thisTaskText;
        
            if(item.status == true) {
                thisTaskBtn = 'radio';
                thisTaskText = 'taskText';
                thisOnClick = 'updateCheck(this);';
            } else {
                thisTaskBtn = 'checkMark';
                thisTaskText = 'taskTextChecked';
                thisOnClick = 'unUpdateCheck(this);';
            }
        
            showTask = '<div class="task"><div class="'+thisTaskBtn+'" id="'+i+'" onclick="'+thisOnClick+'"></div><div class="'+thisTaskText+'">'+item.task+'</div></div>';
            allTasks.innerHTML += showTask;
        }
}



// Сохранение новой задачи
document.querySelector('#save').addEventListener('click', () => {
    let newTaskContent = document.querySelector('#newTask').value.replace(/\r?\n/g, " ");
    if(newTaskContent == '') return false;
    let newTaskDate = document.querySelector('#date').value.replace(/\r?\n/g, " ");
    if(newTaskDate == '') newTaskDate = null;
    let newTaskTime = document.querySelector('#time').value.replace(/\r?\n/g, " ");
    if(newTaskTime == '') newTaskTime = null;

    const items = {...localStorage};
    let lastIdTask = Object.keys(items).length + 1;

    localStorage.setItem(lastIdTask, '{"status": true, "task": "'+newTaskContent+'", "date": "'+newTaskDate+'", "time": "'+newTaskTime+'"}');

    document.querySelector('#newTask').value = '';
    document.querySelector('#date').value = '';
    document.querySelector('.addNewTask').style.display = 'none';
    updateList();
    for(let allTaskText of document.querySelectorAll('.taskText')) {
        showMore(allTaskText);
    }
    for(let allTaskText of document.querySelectorAll('.taskTextChecked')) {
        showMore(allTaskText);
    }
});
updateList();

function changeH1() {
    let h1 = document.querySelector('h1');
    console.log(h1);
}