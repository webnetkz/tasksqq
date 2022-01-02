"use strict";
import { initError, showError } from './moduls/error.js';
import { initSettings } from './moduls/settings.js';
import { changeActiveBoard, createBoard} from "./moduls/taskBoard.js";
import { showModal, closeModal } from "./moduls/modal.js";


document.addEventListener('DOMContentLoaded', () => {
    initError();
    initSettings();

    for(let board of document.querySelectorAll('.board')) {
        board.addEventListener('click', (board) => {
            changeActiveBoard(board.target);
        });
    }

    showModal('msg');
    document.querySelector('.modalClose').addEventListener('click', () => { closeModal(); });
    createBoard();
});

