<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/public/css/styles.css">
    <title>TasKZ</title>

        <meta name="theme-color" content="#2196f3">
        <meta name="author" content="webnet.kz">
        <meta name="description" content="Это простой задачник для записи задач и получение напоминаний">
        <meta name="keywords" content="Tasks, My Tasks, Задачник, Записать задачи">
        <meta name="robots" content="index, follow">

        <link rel="shortcut icon" href="/public/img/miniLogo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/img/logo.png">
        <link rel="manifest" href="/public/json/manifest.json"> 
    <style>
        body {
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div class="form signinBlock">
        <form action="#" class="linesOfForm">
                <span class="formL formL-t"></span>
                <span class="formL formL-r"></span>
                <span class="formL formL-b"></span>
                <span class="formL formL-l"></span>
            <input type="email" id="email" name="email" class="inp" placeholder="Email" required autocomplete="off">
            <input type="password" id="password" name="pass" class="inp" placeholder="Password" required autocomplete="off">
            <div class="sign">
                <a href="#" class="neonBtn" onclick="authorization();">
                    <span class="neonBtnL neonBtnL-t"></span>
                    <span class="neonBtnL neonBtnL-r"></span>
                    <span class="neonBtnL neonBtnL-b"></span>
                    <span class="neonBtnL neonBtnL-l"></span>
                    Authorization
                </a>
            </div>
        </form>
    </div>
    <div class="error" onclick="closeError(this)"></div>
    <script>       
        if(localStorage.getItem('settings')) {
            location.href = '/tasks';
        }
    </script>
    <!-- <script>
        // Проверка браузера на поддержку service worker
        if('serviceWorker' in navigator) {
            // Подключаем sw
               navigator.serviceWorker.register('/sw.js').then(function() {
                console.log("Service Worker Registered");
            });
        }
    </script> -->
    <script src="/public/js/error.js"></script>
    <script src="/public/js/authorization.js"></script>
    <script>
        document.addEventListener("keypress", function onEvent(event) {
            if (event.key === "Enter") {
                authorization();
            }
        });
    </script>
</body>
</html>