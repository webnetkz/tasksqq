<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/css/styles.css">
    <link rel="shortcut icon" href="/public/img/miniLogo.png" type="image/png">
    <link rel="apple-touch-icon" href="/public/img/logo.png">
    <title>Tasks</title>

</head>
<body>
    <h1></h1>
    <div id="allTasks"></div>

    <div class="addNewTask">
        <button class="btn closeBtn">Закрыть</button>
        <br>
        <textarea class="inp" id="newTask"></textarea>
        <hr>
        <div>
            <div style="width: 70px;">
                <label for="date" style="position: absolute;">Date: </label>
                <input type="date" class="date" id="date">
            </div>
            <div style="width: 95px;">
                <label for="time">Time: </label>
                <input type="time" class="date" id="time">
            </div>
        </div>
        <hr>
        <br><br>
        <button class="btn" id="save">Сохранить</button>
    </div>

    <footer>
        <span class="addBtn">+</span>
    </footer>
    <script>       
        if(!sessionStorage.getItem('user')) {
            location.href = '/index';
        }
    </script>
    <script src="/public/js/main.js"></script>
    <script src="/public/js/notifications.js"></script>
    <script src="/public/js/showNotifications.js"></script>
    <script>
        if(!sessionStorage.getItem('h1')) {
            sessionStorage.setItem('h1', 'Tasks');
        }
        let h1 = document.querySelector('h1');
        h1.innerHTML += sessionStorage.getItem('h1') + '<span class="icon"><img src="/public/img/pencil.png" onclick="changeH1();"></span>';
    
        function changeH1() {
            let task = prompt('Введите названия задачника!');
            if(!task) { task = 'Tasks' };
            let h1 = document.querySelector('h1');
            sessionStorage.setItem('h1', task);
            h1.innerHTML = task + '<span class="icon"><img src="/public/img/pencil.png" onclick="changeH1();"></span>';
        }
    </script> 
    <script>
        // Проверка браузера на поддержку service worker
        if('serviceWorker' in navigator) {
            // Подключаем sw
               navigator.serviceWorker.register('/sw.js').then(function() {
                console.log("Service Worker Registered");
            });
        }
    </script>
</body>
</html>