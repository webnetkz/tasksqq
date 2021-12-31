export function createError() {
    let errorBlock = document.createElement('div');
    errorBlock.classList.add('error');
    errorBlock.setAttribute('onclick', 'closeError(this)');
    document.body.appendChild(errorBlock);
}
export function showError(msg) {
    let errorBlock = document.querySelector('.error');
    errorBlock.classList.add('errorAnim');
    errorBlock.style.display = 'block';
    errorBlock.innerHTML = msg;
}
export function closeError(elem) {
    elem.style.top = '-200px';
    setTimeout(() => {
        elem.style.top = '10px';
        elem.style.display = 'none';
    }, 500);
}
