function closeError(elem) {
    elem.style.top = '-200px';
    setTimeout(() => {
        elem.style.top = '10px';
        elem.style.display = 'none';
    }, 500);
}

function showError(msg) {
    let errorBlock = document.querySelector('.error');
    errorBlock.style.display = 'block';
    errorBlock.innerHTML = msg;
}