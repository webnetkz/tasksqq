function showModal(msg, newList) {

    let modalBlock = document.createElement('div');
    modalBlock.classList.add('modalBlock');

    modalBlock.style.cssText = `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 999;
        padding: 50px 10px;
        animation: showModalBlock 0.5s linear;
    `;

    let modalContent = document.createElement('div');
    modalContent.classList.add('modalContent');

    modalContent.style.cssText = `
        position: relative;
        background: #333;
        border-radius: 5px;
        min-widht: 100%;
        min-height: 150px;
        padding: 30px 8px;
        color: rgb(163, 163, 163);
        transition-duration: 800ms;
        animation: showModalContent 0.2s linear;
    `;

    let modalClose = document.createElement('span');
    modalClose.classList.add('modalClose');
    modalClose.innerText = 'x';
    modalClose.setAttribute('onclick', 'closeModal()');

    modalClose.style.cssText = `
        position: absolute;
        top: -7px;
        left: calc(100vw - 37px);
        color: white;
        background: red;
        padding: 4px 8px;
        line-height: 15px;
        border-radius: 3px;
        animation: showModalClose 0.4s linear;
    `;

    modalContent.innerHTML = '<p>'+msg+'</p>';

    if(newList) {
        modalContent.innerHTML += `
        <br>
        <input type="text" class="inp" placeholder="Create new task list" required autocomplete="off">
        <div class="sign">
            <a href="#" class="neonBtn" onclick="create_task(this);">
                <span class="neonBtnL neonBtnL-t"></span>
                <span class="neonBtnL neonBtnL-r"></span>
                <span class="neonBtnL neonBtnL-b"></span>
                <span class="neonBtnL neonBtnL-l"></span>
                Create
            </a>
        </div>`;
    }

    modalContent.appendChild(modalClose);
    modalBlock.appendChild(modalContent);
    document.body.appendChild(modalBlock);

}

function closeModal() {
    let modalBlock = document.querySelector('.modalBlock');
    modalBlock.querySelector('.modalClose').style.top = '-200px';
    modalBlock.querySelector('.modalContent').style.opacity = '0';
    modalBlock.style.background = 'rgba(0, 0, 0, 0)';

    setTimeout(() => {
        modalBlock.remove();
    }, 500);
}