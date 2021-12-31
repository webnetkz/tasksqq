"use strict";
import { createError, showError, closeError } from './moduls/error.js';

document.addEventListener('DOMContentLoaded', () => {
    createError();
    showError('123');
    closeError();
});

