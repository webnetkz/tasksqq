/*
    Модуль fetch запросов
    v0.5
*/
// Запрос с настройками метода и отправкой тела в запросе
export async function f(url, type='text', req='', meth='POST') {
    let data; // Данные которые выдаст функция в итоге

    let res = await fetch(url, { // Сам запрос на URL
        method: meth, // Метод запроса POST/PUT/DELETED
        headers: { // Заголовки
            'Content-Type': 'application/json'
        },
        body: req // Тело запроса
    });

    if(res.ok) { // Если ответ 200
        if(type == 'text') { 
            data = res.text(); // Получаем текстовый ответ
        }
        if(type == 'json') { 
            data = res.text(); // Получаем json ответ
        }
    }
    return data;
}

// GET запрос, ответ в json формате
export async function fG(url) {
    const tmp = await fetch(url)
    return tmp.json();
}