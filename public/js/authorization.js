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
                        showError('User with this username is not registered!');
                    }
                    if(xhr.responseText == 'bad pass') {
                        showError('You entered an incorrect password!');
                    }
                    if(xhr.responseText == 'GOOD') {
                        localStorage.setItem('user', 'true');
                        location.href = '/tasks';
                    }
                }
            }

            // Отправка запроса на сервер
            xhr.send('login=' + login + '&pass=' + pass);
        } else {
            showError('Enter password!');
        }
    } else {
        showError('Enter your username or email!');
    }
}