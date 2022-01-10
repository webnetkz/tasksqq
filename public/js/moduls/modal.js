/*
    Модуль модального окна
    v1.1
*/
// Функция отображения модального окна
export function showModal(msg, close=true) {
    let modalBlock = document.createElement('div'); // Создаем сам блок
    modalBlock.classList.add('modalBlock'); // Добавляем класс модального окна
    
    // Стили для работы модального окна
    let modalStyles = document.createElement('style');
    modalStyles.id = 'modalStyles'; // Добавялем id для удаления
    modalStyles.innerText = `
        .modalBlock {
            position: fixed;
            left: 0;
            top: 0;
            width: calc(100vw - 20px);
            height: 100vh;
            background: rgba(0, 0, 0, 0.4);
            z-index: 999;
            padding: 50px 10px;
            animation: showModalBlock 0.5s linear;
        }
        .modalContent {
            position: relative;
            background: #333;
            border-radius: 5px;
            min-widht: 100%;
            padding: 30px 8px;
            color: rgb(163, 163, 163);
            transition-duration: 800ms;
            animation: showModalContent 0.2s linear;
        }
        .modalClose {
            position: absolute;
            top: -7px;
            left: calc(100vw - 37px);
            color: white;
            background: red;
            padding: 4px 8px;
            line-height: 15px;
            border-radius: 3px;
            animation: showModalClose 0.4s linear;
        }
        .icon img {
            height: 1.6rem;
            padding: 0 10px;
        }
        .modalClose:hover {
            cursor: pointer;
            transform: scale(1.2);
        }
        @keyframes showModalBlock {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        @keyframes showModalContent {
            from {
                left: -400px;
            }
            to {
                left: 0px;
            }
        }
        @keyframes showModalClose {
            from {
                top: -200px;
            }
            to {
                top: -7px;
            }
        }
        @media only screen and (min-width: 1400px) {
        
        }        
    `;

    let modalContent = document.createElement('div'); // Блок для контента модального окна
    modalContent.classList.add('modalContent'); // Добавляем стили контенту

    // Создаем кномку закрытия модального окна
    let modalClose = document.createElement('span');
    modalClose.classList.add('modalClose');
    modalClose.innerText = 'x';
    modalClose.addEventListener('click', () => {
    let modalBlock = document.querySelector('.modalBlock');
        modalBlock.querySelector('.modalClose').style.top = '-200px';
        modalBlock.querySelector('.modalContent').style.opacity = '0';
        modalBlock.style.background = 'rgba(0, 0, 0, 0)';
        let modalStyles = document.querySelector('#modalStyles');

        setTimeout(() => {
            modalBlock.remove();
            modalStyles.remove();
        }, 500);
    });

    modalContent.innerHTML = '<p>'+msg+'</p>'; // Помещаем сообщение в модальное окно

    document.head.appendChild(modalStyles); // Добавляет стили модального окна
    if(close) {
        modalContent.appendChild(modalClose); // Добавляет кнопку закрытия
    }
    modalBlock.appendChild(modalContent); // Добавляет контент в модальное окно
    document.body.appendChild(modalBlock); // Отображаем модальное окно
}

export function closeModal() {
    let modalClose = document.querySelector('.modalClose');
    let modalStyles = document.querySelector('#modalStyles');

    modalClose.click();
    setTimeout(() => {
        modalStyles.remove();
    }, 500);
}