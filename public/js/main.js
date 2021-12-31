"use strict";
import { initError, showError } from './moduls/error.js';
import { initSettings } from './moduls/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    initError();
    initSettings();
});

