<?php
function setupCors(array $allowedOrigins): void
{
    $origin = $_SERVER["HTTP_ORIGIN"] ?? null;

    if ($origin && in_array($origin, $allowedOrigins, true)) {
        header("Access-Control-Allow-Origin: " . $origin);
    } else {
        // Разрешить всё (для тестов через Postman/браузер)
        header("Access-Control-Allow-Origin: *");
    }

    // ДОБАВЬТЕ X-Auth-Token в разрешенные заголовки
    header("Access-Control-Allow-Headers: Content-Type, Authorization, x-auth-token");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Vary: Origin");

    // Preflight
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }
}