import { initMenu, createList } from "./taskBoard.js";
import { showModal } from "./modal.js";
import { get_json, set_json } from "./localStorage.js";

export function initSettings() {
    // Первый вход в приложение
    if(!localStorage.getItem('settings') || get_json('settings').active_list == false) {
        set_json('settings', {"active_list": false}); // Создаем временные настройки
        set_json('lists', {});
        showModal(`<input type="text" class="inp" placeholder="Введите имя нового списка задач..."><button id="create_new_list" class="btn">Создать список</button>`, false);       
        createList();
        initMenu();
    } else {
        initMenu();
    }
}
