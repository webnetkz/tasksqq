"use strict";
import { initError, showError } from './moduls/error.js';
import { initSettings } from './moduls/settings.js';
import { changeActiveBoard, createBoard, deleteActiveBoard, renameActiveBoard} from "./moduls/taskBoard.js";
import { showModal } from "./moduls/modal.js";


document.addEventListener('DOMContentLoaded', () => {
    initError();
    initSettings();

    for(let board of document.querySelectorAll('.board')) {
        board.addEventListener('click', (board) => {
            changeActiveBoard(board.target);
        });
    }

    document.querySelector('#settings').addEventListener('click', () => {
        showModal(`
            <button class="btn" id="renameActiveBoard" onclick="document.querySelector('.modalBlock').remove();">Переименовать активный список</button>
            <button class="btn" id="deleteActiveBoard">Удалить активный список</button>
        `);
        document.querySelector('#deleteActiveBoard').addEventListener('click', () => {
            deleteActiveBoard();
        });
        document.querySelector('#renameActiveBoard').addEventListener('click', () => {
            renameActiveBoard();
        });
    });


    createBoard();
});

