export function createError() {
    let errorBlock = document.createElement('div');
    errorBlock.classList.add('error');
    errorBlock.setAttribute('onclick', 'closeError()');
    document.body.appendChild(errorBlock);
}
export function showError(msg) {
    let errorBlock = document.querySelector('.error');
    errorBlock.classList.add('errorAnim');
    errorBlock.style.display = 'block';
    errorBlock.innerHTML = msg;
}
export function closeError() {
    let err = document.querySelector('.error');
    err.addEventListener('click', () => {
        err.style.top = '-200px';
        setTimeout(() => {
            err.style.top = '10px';
            err.style.display = 'none';
        }, 500);
    });
}
