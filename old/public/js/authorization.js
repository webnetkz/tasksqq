function authorization() {
    
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');

    if(email.value) {
        if(password.value) {
            let login = email.value;
            login = encodeURIComponent(login);
            let pass = password.value;
            pass = encodeURIComponent(pass);

            var xhr = new XMLHttpRequest();

            xhr.open('POST', '/app/sign/signin');

            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            // Обработка запроса на сервер
            xhr.onreadystatechange = function() {
                if(xhr.readyState === 4 && xhr.status === 200) {
                    // Полученый ответ от сервера
                    if(xhr.responseText == 'not user') {
                        showError('Пользователь с данным логином не зарегистрирован!');
                    }
                    if(xhr.responseText == 'bad pass') {
                        showError('Пароль введен не верно!');
                    }
                    if(xhr.responseText == 'GOOD') {
                        localStorage.setItem('settings', '{}');
                        location.href = '/tasks';
                    }
                }
            }

            // Отправка запроса на сервер
            xhr.send('login=' + login + '&pass=' + pass);
        } else {
            showError('Введите пароль!');
        }
    } else {
        showError('Введите логин или email!');
    }
}