"use strict";
import { initError, showError } from './moduls/error.js';
import { initSettings } from './moduls/settings.js';
import { showModal } from "./moduls/modal.js";
import { deleteActiveList, createTask } from './moduls/taskBoard.js';


document.addEventListener('DOMContentLoaded', () => {
    initError();
    initSettings();

    let settings = document.querySelector('#settings');
    settings.addEventListener('click', () => {
        deleteActiveList();
    });

    let addBtn = document.querySelector('.addBtn');
    addBtn.addEventListener('click', () => {
        createTask();
    });
});

