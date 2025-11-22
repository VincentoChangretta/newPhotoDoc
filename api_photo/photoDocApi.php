<?php
header('Content-Type: application/json; charset=utf-8');

// CORS
require_once __DIR__ . "/../../privatePhotoDoc/cors.php";
setupCors([
    "http://localhost:5173",
    "https://photodoc.online"
]);

// Подключение к базе
require_once __DIR__ . '/db.php';
$pdo->exec("SET NAMES 'utf8mb4'");

// Проверяем параметр
if (empty($_GET['serviceType'])) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Не указан параметр serviceType"
    ]);
    exit;
}

$serviceType = $_GET['serviceType'];

try {
    $data = [];

    if ($serviceType === 'service_type_photo_document') {
        $stmt = $pdo->prepare("
            SELECT *
            FROM photo_documents
            WHERE service_type_id = :serviceType
        ");
        $stmt->execute(['serviceType' => $serviceType]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    echo json_encode([
        "success" => true,
        "data" => $data
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Ошибка при получении данных",
        "message" => $e->getMessage()
    ]);
}
