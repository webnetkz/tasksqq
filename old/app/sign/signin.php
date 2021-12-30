<?php

require_once '../libs/db.php';

$login = trim($_POST['login']);
$pass = trim($_POST['pass']);

$resLogin = $pdo->query('SELECT `login`, `pass` FROM users WHERE `login` ="'.$login.'"');
$resLogin = $resLogin->fetch(PDO::FETCH_ASSOC);
if($resLogin) {
    if($pass == $resLogin['pass']) {
        echo 'GOOD';
    } else {
        echo 'bad pass';
    }
} else {
    echo 'not user';
}