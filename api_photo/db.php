<?php

header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . "/../../privatePhotoDoc/cors.php";
setupCors([
    "http://localhost:5173",
    "https://photodoc.online"
]);
require_once __DIR__ . "/../../privatePhotoDoc/config.php";

try {
    $dsn = "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode([
        "error" => "Ошибка подключения к базе данных",
        "message" => $e->getMessage()
    ]));
}
