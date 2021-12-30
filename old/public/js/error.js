function closeError(elem) {
    elem.style.top = '-200px';
    setTimeout(() => {
        elem.style.top = '10px';
        elem.style.display = 'none';
    }, 500);
}

function showError(msg) {
    let errorBlock = document.querySelector('.error');
    errorBlock.classList.add('errorAnim');
    errorBlock.style.display = 'block';
    errorBlock.innerHTML = msg;
}

// Добавление блока отображения ошибок
let errorBlock = document.createElement('div');
errorBlock.classList.add('error');
errorBlock.setAttribute('onclick', 'closeError(this)');
document.body.appendChild(errorBlock);

