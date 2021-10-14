<?php

// Enable errors
error_reporting(E_ALL);
ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);

// Function for debug code
function x($data) {
    echo '<pre>';
        var_dump($data);
    echo '</pre>';
    exit();
    
}